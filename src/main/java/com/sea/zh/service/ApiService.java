package com.sea.zh.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sea.zh.model.ShipInfo;
import okhttp3.*;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**负责发送HTTP请求获取token令牌并返回access_token
 * 返回值：access_token, String
 * */
@Service
public class ApiService {
    private final OkHttpClient httpClient = new OkHttpClient();

    public String getToken() throws IOException {
        MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
        RequestBody body = RequestBody.create(mediaType, "scope=all&grant_type=password&username=zouyonghua&password=zouyh@6622");
        Request request = new Request.Builder()
                .url("http://bs.uniseas.com.cn/apiv1/uaa/oauth/token")
                .post(body)
                .addHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==")
                .addHeader("Content-Type", "application/x-www-form-urlencoded")
                .build();

        try (Response response = httpClient.newCall(request).execute()) {
            if (response.isSuccessful()) {
                assert response.body() != null;
                String responseBody = response.body().string();
                System.out.println("getToken——请求发送成功，得到响应，响应体转换成string类型："+responseBody);
                String tokenResult = parseAccessToken(responseBody);
                return tokenResult;
            } else {
                throw new IOException("token获取失败: " + response.code());
            }
        }
    }

    public String getShipInfo(String targetId,  int mmsi){
        String token = null;
        try {
            token = this.getToken();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        OkHttpClient client = new OkHttpClient();

        // 使用传递的参数构建URL
        String url = "https://bs.uniseas.com.cn/apiv1/target/ais/info?targetId=" + targetId + "&mmsi=" + mmsi;

        Request request = new Request.Builder()
                .url(url)
                .get()
                .addHeader("Authorization", "Bearer" + token)
                .addHeader("content-type", "application/x-www-form-urlencoded")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                assert response.body() != null;
                String responseBody = response.body().string();
                System.out.println("getShipInfo——请求发送成功，得到响应转换成string类型：" + responseBody);

                // 使用Gson解析响应体
                Gson gson = new Gson();
                JsonObject jsonObject = gson.fromJson(responseBody, JsonObject.class);
                System.out.println("getShipInfo——使用Gson解析响应体：" + jsonObject);
                JsonObject dataObject = jsonObject.getAsJsonObject("data");
                System.out.println("解析结果：" + dataObject);
                // 将data对象转换为字符串
                String data = dataObject.toString();
                System.out.println("变成String类型返回：" + data);
                return data;
            } else {
                throw new IOException("获取船舶信息失败: " + response.code());
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ShipInfo parseShipInfo(String responseBody) {
        // 解析JSON响应，并将数据映射到ShipInfo对象
        Gson gson = new Gson();
        ShipInfo shipInfo = gson.fromJson(responseBody, ShipInfo.class);
        return shipInfo;
    }

    private String parseAccessToken(String responseBody) {
//        将字符串类型的响应体类型转换成JSON格式
        JSONObject jsonObject = new JSONObject(responseBody);
//        json响应：
//        {"access_token":"29e34d0a-7448-46e5-9e33-b3e33c315fed",
//        "token_type":"bearer","refresh_token":"2c68fd20-a0d2-4783-bde4-617556e74bbc",
//        "expires_in":32876,"scope":"all",
//        "userInfo":"{\"mobile\":\"jTNuY2Ts8FhtZYnL/3zQSOCKqjGGMjNlf/L3\",
//        \"id\":1060066328295579648,\"authorities\":[{\"authority\":\"hn\"},
//        {\"authority\":\"974854567655251968\"}],\"username\":\"zouyonghua\"}"}
        System.out.println("parseAccessToken——Sting类型转换成json类型："+jsonObject);
//        返回json对象中的access_token
        String access_token = jsonObject.getString("access_token");
        System.out.println("access_token:"+access_token);
        return access_token;
    }
}