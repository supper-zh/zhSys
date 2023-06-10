package com.sea.zh.client;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.sea.zh.service.ApiService;
import okhttp3.*;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.io.IOException;


@ConfigurationProperties
//@Configuration
//@EnableScheduling
@Component
//public class WebSocketClient implements SchedulingConfigurer {
public class WebSocketClient {
    private final OkHttpClient httpClient;
    private WebSocket webSocket;
    private final ApiService apiService;
    // WebSocket连接的自动刷新间隔（毫秒）
    private static final long REFRESH_INTERVAL = 60 * 60 * 1000; // 60分钟

    // MongoDB连接相关配置
    private static final String MONGO_HOST = "localhost";
    private static final int MONGO_PORT = 27017;
    private static final String MONGO_DATABASE = "MonitorSysDb";
    private static final String MONGO_COLLECTION = "ship";
    private MongoClient mongoClient;
    private MongoDatabase database;
    private MongoCollection<Document> collection;

    @Autowired
    public WebSocketClient(ApiService apiService) {
        this.apiService = apiService;
        this.httpClient = new OkHttpClient();

        mongoClient = MongoClients.create("mongodb://" + MONGO_HOST + ":" + MONGO_PORT);
        database = mongoClient.getDatabase(MONGO_DATABASE);
        collection = database.getCollection(MONGO_COLLECTION);
    }
//    @Override
//    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
////        配置定时任务：
////        设置任务的固定延迟时间，并指定要执行的方法。
////        将reconnectWebSocket方法作为定时任务，使其每隔指定的刷新间隔自动执行。
//        taskRegistrar.addFixedDelayTask(this::reconnectWebSocket, REFRESH_INTERVAL);
//    }
//
//    private void reconnectWebSocket() {
//        //        先关闭
//        closeConnection();
//        // 重新连接WebSocket
//        connectAndReceiveData();
//    }

    //    // 将数据存储到MongoDB数据库
    private void storeData(JSONObject data) {
        // 实现将数据存储到MongoDB
        Document document = Document.parse(data.toString());
        collection.insertOne(document);
    }

    public void connectAndReceiveData() {
        String accessToken = null;  //发送登录请求获取token
        try {
            accessToken = apiService.getToken();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
//        String accessToken = MyApplicationRunner.token; //获取动态刷新的token
        if (accessToken == null) {
            System.out.println("connectAndReceiveData——WebSocketClient获取AccessToken失败");
            return;
        }

        Request request = new Request.Builder()
                .url("ws://bs.uniseas.com.cn/apiv1/target/ws/" + accessToken)
                .build();
        WebSocketListener webSocketListener = new WebSocketListener() {
            @Override
            public void onOpen(WebSocket webSocket, Response response) {
                System.out.println("webSocketListener——WebSocket连接已建立");
            }

            @Override
            public void onMessage(WebSocket webSocket, String text) {
                System.out.println("webSocketListener——系统收到消息：" + text);
                parseAndStoreData(text);
            }

            @Override
            public void onClosed(WebSocket webSocket, int code, String reason) {
                System.out.println("webSocketListener——WebSocket连接已关闭");
                System.out.println("webSocketListener——WebSocket closed with code " + code + ", reason: " + reason);

            }

            @Override
            public void onFailure(WebSocket webSocket, Throwable t, Response response) {
                System.out.println("webSocketListener——WebSocket连接失败: " + t.getMessage());

            }
        };

        webSocket = httpClient.newWebSocket(request, webSocketListener);
    }

    public void closeConnection() {
        if (webSocket != null) {
            webSocket.cancel();
            webSocket = null;
            System.out.println("closeConnection——WebSocket连接关闭");
        } else {
            System.out.println("closeConnection——WebSocket连接已经关闭");
        }
    }


    private void parseAndStoreData(String message) {
        System.out.println("parseAndStoreData——接收到的数据: " + message);

        try {
            JSONArray jsonArray = new JSONArray(message);
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                // 解析数据并存储到MongoDB数据库
                storeData(jsonObject);
            }
        } catch (JSONException e) {
            System.out.println("解析数据出错: " + e.getMessage());
        }
    }
}
