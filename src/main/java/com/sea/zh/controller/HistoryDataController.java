package com.sea.zh.controller;

import com.sea.zh.model.HistoryData;
import com.sea.zh.service.HistoryDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/apiv1")
public class HistoryDataController {

    private final HistoryDataService historyDataService;

    @Autowired
    public HistoryDataController(HistoryDataService historyDataService) {
        this.historyDataService = historyDataService;
    }
    @GetMapping("/history")
    public String  getHistoryData(){
//            测试一下
        return "ok";
    }

    @GetMapping("/error")
    public ResponseEntity<String> handleError() {
        // 处理错误逻辑，例如返回自定义的错误信息
        String errorMessage = "请求的资源不存在";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }

    @GetMapping("/history/{startTime}/{endTime}/{targetId}/{mmsi}/{zoom}")
    public ResponseEntity<HistoryData> getHistoryData( @PathVariable Long startTime,
                                                       @PathVariable Long endTime,
                                                       @PathVariable int targetId,
                                                      @PathVariable(required = false) int mmsi,
                                                      @RequestParam(value = "zoom", defaultValue = "10") Integer zoom){
        HistoryData historyData = null;
        historyData = historyDataService.getHistoryData(startTime, endTime, targetId, mmsi, zoom);
        return ResponseEntity.ok(historyData);
    }
}
