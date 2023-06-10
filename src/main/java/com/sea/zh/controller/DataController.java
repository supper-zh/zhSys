package com.sea.zh.controller;

import com.sea.zh.model.Ship;
import com.sea.zh.model.ShipInfo;
import com.sea.zh.service.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/ship")
public class DataController {

//    通过调用 ShipService 类中的相应查询方法来获取船舶数据，
//    并将结果封装到 ResponseEntity 类中作为响应返回
//    使用 ResponseEntity.ok() 方法返回状态码为 200 的成功响应
    private final ShipService shipService;
    @Autowired
    public DataController(ShipService shipService) {
        this.shipService = shipService;
    }

    @GetMapping("/ShipInfo/{targetId}/{mmsi}")
    public ResponseEntity<List<ShipInfo>> getShipDetail(@PathVariable String targetId, @PathVariable int mmsi) {
        List<ShipInfo> shipInfo = shipService.getShipDetail(targetId, mmsi);
        return ResponseEntity.ok(shipInfo);
    }


    @GetMapping("/targetId/{targetId}")
    public ResponseEntity<List<Ship>> getShipsByTargetId(@PathVariable String targetId) {
        List<Ship> ships = shipService.getShipsBytargetId(targetId);
        return ResponseEntity.ok(ships);
    }

    //    根据mmsi字段查询船舶信息
    @GetMapping("/mmsi/{mmsi}")   //测试成功：/api/ship/mmsi/413489990
    public ResponseEntity<List<Ship>> getShipsByMmsi(@PathVariable int mmsi) {
        List<Ship> ships = shipService.getShipsByMmsi(mmsi);
        return ResponseEntity.ok(ships);
    }
    //  根据指定timestamp查找船舶
    @GetMapping("/timestamp/{timestamp}")
    public ResponseEntity<List<Ship>> getShipsByTimestamp(@PathVariable long timestamp) {
        List<Ship> ships = shipService.getShipsByTimestamp(timestamp);
        return ResponseEntity.ok(ships);
    }
    //    根据船舶状态查询船舶信息
    @GetMapping("/state/{state}")
    public ResponseEntity<List<Ship>> getShipsByState(@PathVariable int state) {
        List<Ship> ships = shipService.getShipsByState(state);
        return ResponseEntity.ok(ships);
    }

//    分页查询方法
//    @GetMapping("/state/{state}")
//    public ResponseEntity<Page<Ship>> getShipsByState(@PathVariable int state,
//                                                      @RequestParam(defaultValue = "0") int page,
//                                                      @RequestParam(defaultValue = "20") int size) {
//        Page<Ship> ships = shipService.getShipsByState(state, page, size);
//        return ResponseEntity.ok(ships);
//    }

    //    根据type字段查询船舶信息
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Ship>> getShipsByType(@PathVariable String type) {
        List<Ship> ships = shipService.getShipsByType(type);
        return ResponseEntity.ok(ships);
    }
    //    查找在指定维度范围内的船舶
    @GetMapping("/latitude/{start}/{end}")
    public ResponseEntity<List<Ship>> getShipsByLatitudeRange(@PathVariable double start, @PathVariable double end) {
        List<Ship> ships = shipService.getShipsByLatitudeRange(start, end);
        return ResponseEntity.ok(ships);
    }
    //  查找在指定经度范围内的船舶
    @GetMapping("/longitude/{start}/{end}")
    public ResponseEntity<List<Ship>> getShipsByLongitudeRange(@PathVariable double start, @PathVariable double end) {
        List<Ship> ships = shipService.getShipsByLongtitudeRange(start, end);
        return ResponseEntity.ok(ships);
    }
    //    查询指定经纬度范围内的船舶信息（矩形区域）
    @GetMapping("/latitude/{startLat}/{endLat}/longitude/{startLon}/{endLon}")
    public ResponseEntity<List<Ship>> getShipsByLatitudeAndLongitudeRange(
            @PathVariable double startLat, @PathVariable double endLat,
            @PathVariable double startLon, @PathVariable double endLon) {
        List<Ship> ships = shipService.getShipsByLatitudeAndLongitudeRange(startLat, endLat, startLon, endLon);
        return ResponseEntity.ok(ships);
    }
    //    查询长度大于指定值的船舶信息
    @GetMapping("/length/{length}")
    public ResponseEntity<List<Ship>> getShipsByLengthGreaterThan(@PathVariable int length) {
        List<Ship> ships = shipService.getShipsByLength(length);
        return ResponseEntity.ok(ships);
    }
    //  查询船舶长度在指定范围内的信息
    //实现
    @GetMapping("/length/{minLength}/{maxLength}")
    public ResponseEntity<List<Ship>> getShipsByLengthRange(@PathVariable double minLength, @PathVariable double maxLength){
        List<Ship> ships = shipService.getShipsByLengthRange(minLength, maxLength);
        return ResponseEntity.ok(ships);
    }
    //    查询指定速度范围的船舶信息
    @GetMapping("/speed/{minSpeed}/{maxSpeed}")
    public ResponseEntity<List<Ship>> getShipsBySpeedRange(
            @PathVariable double minSpeed, @PathVariable double maxSpeed) {
        List<Ship> ships = shipService.getShipsBySpeedRange(minSpeed, maxSpeed);
        return ResponseEntity.ok(ships);
    }
    //    查询指定timestamp（时间）范围内的船舶信息
    @GetMapping("/timestamp/{start}/{end}")
    public ResponseEntity<List<Ship>> getShipsByTimestampRange(@PathVariable long start, @PathVariable long end) {
        List<Ship> ships = shipService.getShipsByTimestampRange(start, end);
        return ResponseEntity.ok(ships);
    }
    //    查询小于指定速度值的船舶信息
    @GetMapping("/speed/{speed}")
    public ResponseEntity<List<Ship>> getShipsBySpeedLessThan(@PathVariable double speed) {
        List<Ship> ships = shipService.getShipsBySpeedLessThan(speed);
        return ResponseEntity.ok(ships);
    }
//  根据mmsi列表批量查询船舶信息
    @PostMapping("/mmsiList")
    public ResponseEntity<List<Ship>> getShipsByMmsiList(@RequestBody List<Integer> mmsiList) {
        List<Ship> ships = shipService.getShipsByMmsiList(mmsiList);
//        / 设置响应头部的 Content-Type 为 application/json
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        // 返回 JSON 数据
        return ResponseEntity.ok()
                .headers(headers)
                .body(ships);
//        return ResponseEntity.ok(ships);
    }
    @GetMapping("/search")
    public ResponseEntity<List<Ship>> searchShips(
            @RequestParam(required = false) Integer state,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Double startLat,
            @RequestParam(required = false) Double endLat,
            @RequestParam(required = false) Double startLon,
            @RequestParam(required = false) Double endLon,
            @RequestParam(required = false) Long startTimestamp,
            @RequestParam(required = false) Long endTimestamp,
            @RequestParam(required = false) Double minSpeed,
            @RequestParam(required = false) Double maxSpeed,
            @RequestParam(required = false) Double minLength,
            @RequestParam(required = false) Double maxLength
    ) {
        List<Ship> ships = shipService.searchShips(
                state, type, startLat, endLat, startLon, endLon,
                startTimestamp, endTimestamp, minSpeed, maxSpeed,
                minLength, maxLength
        );

        return ResponseEntity.ok(ships);

    }


}
