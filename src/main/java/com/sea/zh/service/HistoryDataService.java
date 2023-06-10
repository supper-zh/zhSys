package com.sea.zh.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sea.zh.model.HistoryData;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class HistoryDataService {
    private static final String HISTORY_DATA_URL = "https://bs.uniseas.com.cn/apiv1/external/target/track/history";
    private static String AUTHORIZATION_HEADER = "Bearer ";
    private final ApiService apiService;

    private final OkHttpClient client;

    public HistoryDataService(ApiService apiService, OkHttpClient client) {
        this.apiService = apiService;
        this.client = client;
    }

    public HistoryData getHistoryData(Long startTime, Long endTime, int targetId, int mmsi, int zoom){
        String accessToken;  //发送登录请求获取token
        try {
            accessToken = apiService.getToken();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if (accessToken == null) {
            System.out.println("getHistoryData——获取AccessToken失败");
            return null;
        }
        AUTHORIZATION_HEADER = AUTHORIZATION_HEADER + accessToken;


        MediaType mediaType = MediaType.parse("application/json");
//        RequestBody body = RequestBody.create(mediaType, "{\r\n\t\"startTime\": \"1685436578875\",\r\n\t\"endTime\": \"1685497579875\",\r\n\t\"targetId\": \"7388326400000338584\",\r\n\t\"mmsi\": \"413283880\",\r\n\t\"zoom\": \"\"\r\n}");
        String requestBody = "{\r\n\t\"" +
                "startTime\": \"" + startTime + "\",\r\n\t\"" +
                "endTime\": \"" + endTime + "\",\r\n\t\"" +
                "targetId\": \"" + targetId + "\",\r\n\t\"" +
                "mmsi\": \"" + mmsi + "\",\r\n\t\"" +
                "zoom\": \"" + zoom + "\"\r\n}";
        RequestBody body = RequestBody.create(mediaType, requestBody);

        Request request = new Request.Builder()
                .url(HISTORY_DATA_URL)
                .post(body)
                .addHeader("Authorization", AUTHORIZATION_HEADER)
                .addHeader("content-type", "application/json")
                .build();

        String responseData = null;
        try (Response response = client.newCall(request).execute()) {
            if (response.body() != null) {
                responseData = response.body().string();
                System.out.println("getHistoryData——响应数据："+responseData);
//                输出结果为：{"code":0,"msg":"success","data":[{"mmsi":413283880,"lastTm":1685436578875,"speed":0.0,"longitude":108.33675505,"latitude":19.06476565,"course":172.60000610351562,"sclass":"RADAR_AIS_A"},{"mmsi":413283880,"lastTm":1685497567938,"speed":0.0,"longitude":108.33656007,"latitude":19.06532595,"course":339.8999938964844,"sclass":"RADAR_AIS_A"}]}
            } else {
                System.out.println("getHistoryData——响应数据为null");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 使用 HistoryItem 类型，将响应数据解析成对象
        ObjectMapper objectMapper = new ObjectMapper();
        HistoryData historyData = null;
        try {
            historyData = objectMapper.readValue(responseData, HistoryData.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return historyData;
    }
}
