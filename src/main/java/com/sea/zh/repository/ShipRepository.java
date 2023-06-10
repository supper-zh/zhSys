package com.sea.zh.repository;

import com.sea.zh.model.Ship;
import com.sea.zh.model.ShipInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**  ShipRepository：
 *  ShipRepository 是用于与 MongoDB 数据库进行交互的接口。
 * 它应该继承自 Spring Data MongoDB 提供的 MongoRepository 接口。
 确保在泛型参数中指定实体类和 ID 类型，例如 MongoRepository<Ship, String>。
 ShipRepository 应该位于与其他存储库接口相同的包中。
 **/

@Repository
public interface ShipRepository extends MongoRepository<Ship, String> {
//    List<Ship> findAllShip(); //查询所有船舶信息
    List<Ship> findBytargetId(String targetId);
    List<Ship> findByMmsi(int mmsi);  // 根据mmsi字段查询船舶信息。
    List<Ship> findByLatitudeBetween(double start, double end); // 查询纬度在指定范围内的船舶信息。
    List<Ship> findByLongitudeBetween(double start, double end); // 查询经度在指定范围内的船舶信息。
    List<Ship> findByType(String type);   // 根据type字段查询船舶信息。
    List<Ship> findByTimestamp(long timestamp);  //根据时间戳查询
    List<Ship> findByTimestampBetween(long startTimestamp, long endTimestamp); //查询指定时间范围内的船舶信息。
    List<Ship> findByLatitudeBetweenAndLongitudeBetween(double startLat, double endLat, double startLon, double endLon); //查询指定经纬度范围内的船舶信息
    List<Ship> findBySpeedBetween(double minSpeed, double maxSpeed);// 查询指定速度范围内的船舶信息。
    List<Ship> findByState(int state);//根据状态查询船舶信息。
    List<Ship> findByLengthGreaterThan(int length);  // findByLengthGreaterThan: 查询长度大于指定值的船舶信息。
    List<Ship> findBySpeedLessThan(double speed);////根据给定的 MMSI 号码列表查询对应船舶信息，查询速度小于指定值的船舶信息。// 如果传入的 mmsiList 是 [123456, 789012, 345678]，则该方法将返回所有 MMSI 号码为 123456、789012 和 345678 的船舶信息。
    List<Ship> findByMmsiIn(List<Integer> mmsiList); //根据给定的 MMSI 号码列表查询对应船舶信息

    List<Ship> findByLengthBetween(double minLength, double maxLength);//查询指定长度范围内的船舶

    List<Ship> searchShips(Query query);

//    分页查询尝试
    Page<Ship> findByStatePage(int state, Pageable pageable);


    List<Ship> findByLength(int length);

    List<ShipInfo> findShipDetail(String targetId, int mmsi);
}
