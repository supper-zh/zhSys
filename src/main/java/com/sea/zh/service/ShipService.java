package com.sea.zh.service;

import com.sea.zh.model.Ship;
import com.sea.zh.model.ShipInfo;
import com.sea.zh.repository.ShipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

/**ShipService：

 ShipService 是业务逻辑层，负责处理与船舶信息相关的业务逻辑。
 在 ShipService 中，你可以注入 ShipRepository 对象，以便通过它来访问和操作数据库。
 可以根据业务需求添加其他方法和逻辑。
 **/
@Service
public class ShipService {
    private final ShipRepository shipRepository;

    @Autowired
    public ShipService(ShipRepository shipRepository) {
        this.shipRepository = shipRepository;
    }

//    public List<Ship> getAllShips() {
//        return shipRepository.findAllShip();
//    }
    public List<Ship> getShipsBytargetId(String targetId) {
        return shipRepository.findBytargetId(targetId);
    }
    public List<Ship> getShipsByMmsi(int mmsi) {
        return shipRepository.findByMmsi(mmsi);
    }

    public List<Ship> getShipsByLatitudeRange(double start, double end) {
        return shipRepository.findByLatitudeBetween(start, end);
    }

    public List<Ship> getShipsByLongtitudeRange(double start, double end) {
        return shipRepository.findByLongitudeBetween(start, end);
    }

    public List<Ship> getShipsByType(String type) {
        return shipRepository.findByType(type);
    }

    public List<Ship> getShipsByTimestamp(long timestamp) {
        return shipRepository.findByTimestamp(timestamp);
    }

    public List<Ship> getShipsByTimestampRange(long startTimestamp, long endTimestamp) {
        return shipRepository.findByTimestampBetween(startTimestamp, endTimestamp);
    }
    public List<Ship> getShipsByLengthRange(double minLength, double maxLength) {
        // Delegate the query to the shipRepository or any other data access layer
        return shipRepository.findByLengthBetween(minLength, maxLength);
    }
    public List<Ship> getShipsByLatitudeAndLongitudeRange(double startLat, double endLat, double startLon, double endLon) {
        return shipRepository.findByLatitudeBetweenAndLongitudeBetween(startLat, endLat, startLon, endLon);
    }

    public List<Ship> getShipsBySpeedRange(double minSpeed, double maxSpeed) {
        return shipRepository.findBySpeedBetween(minSpeed, maxSpeed);
    }
    public List<ShipInfo> getShipDetail(String targetId, int mmsi){

        List<ShipInfo> shipInfo = shipRepository.findShipDetail(targetId, mmsi);
        return shipInfo;
    }

    public List<Ship> getShipsByState(int state) {
        return shipRepository.findByState(state);
    }

    public List<Ship> getShipsByLength(int length) {
        return shipRepository.findByLength(length);
    }

    public List<Ship> getShipsBySpeedLessThan(double speed) {
        return shipRepository.findBySpeedLessThan(speed);
    }

    public List<Ship> getShipsByMmsiList(List<Integer> mmsiList) {
        return shipRepository.findByMmsiIn(mmsiList);
    }


    public List<Ship> searchShips(
            Integer state,
            String type,
            Double startLat,
            Double endLat,
            Double startLon,
            Double endLon,
            Long startTimestamp,
            Long endTimestamp,
            Double minSpeed,
            Double maxSpeed,
            Double minLength,
            Double maxLength
    ) {
        Criteria criteria = new Criteria();
        if (state != null) {
            criteria.and("state").is(state);
        }
        if (type != null) {
            criteria.and("type").is(type);
        }
        if (startLat != null && endLat != null && startLon != null && endLon != null) {
            criteria.and("latitude").gte(startLat).lte(endLat);
            criteria.and("longitude").gte(startLon).lte(endLon);
        }
        if (startTimestamp != null && endTimestamp != null) {
            criteria.and("timestamp").gte(startTimestamp).lte(endTimestamp);
        }
        if (minSpeed != null && maxSpeed != null) {
            criteria.and("speed").gte(minSpeed).lte(maxSpeed);
        }
        if (minLength != null && maxLength != null) {
            criteria.and("length").gte(minLength).lte(maxLength);
        }

        Query query = Query.query(criteria);
        return shipRepository.searchShips(query);
    }

//    public Page<Ship> getShipsByState(int state, int pageNumber, int pageSize) {
//        Pageable pageable = PageRequest.of(pageNumber, pageSize);
//        return shipRepository.findByStatePage(state, pageable);
//    }



}
