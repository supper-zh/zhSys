package com.sea.zh.controller;


import com.sea.zh.client.WebSocketClient;
import com.sea.zh.service.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


/**
 * 负责接收控制WebSocket连接的请求。*/
@Controller
@RequestMapping("/db")
public class WebSocketController {
    private final WebSocketClient webSocketClient;
    private final ApiService apiService;

    @Autowired
    public WebSocketController(WebSocketClient webSocketClient, ApiService apiService) {
        this.webSocketClient = webSocketClient;
        this.apiService = apiService;
    }

    @GetMapping("/token")
    @ResponseBody
    public String getToken() {
        // 处理获取令牌的逻辑
        String token = null;
        try {
            token = apiService.getToken();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return token != null ? token : "";
    }

    @GetMapping("/shipDetail/{targetId}/{mmsi}")
    @ResponseBody
    public String getShipDetail(@PathVariable String targetId, @PathVariable int mmsi){
        // 发送查询参数，调用查询逻辑
        // 处理数据并返回
        return apiService.getShipInfo(targetId, mmsi);
    }

    @GetMapping("/start")
    @ResponseBody
    public String startWebSocket() {

        // 开启WebSocket连接
        webSocketClient.connectAndReceiveData();
        return "WebSocket连接已开启,后台正在接收数据";
    }

    @GetMapping("/stop")
    @ResponseBody
    public String stopWebSocket() {
        webSocketClient.closeConnection();
        return "WebSocket连接已关闭，后台停止接收数据";
    }


}
