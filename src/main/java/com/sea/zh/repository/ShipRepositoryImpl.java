package com.sea.zh.repository;

import com.sea.zh.model.Ship;
import com.sea.zh.model.ShipInfo;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

//@Repository
public  class ShipRepositoryImpl implements ShipRepository {
    private final MongoTemplate mongoTemplate;

    public ShipRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Ship> findBytargetId(String targetId) {
        Query query = Query.query(Criteria.where("targetId").is(targetId));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findByMmsi(int mmsi) {
        Query query = Query.query(Criteria.where("mmsi").is(mmsi));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findByLatitudeBetween(double start, double end) {
        Query query = Query.query(Criteria.where("latitude").gte(start).lte(end));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findByLongitudeBetween(double start, double end) {
        Query query = Query.query(Criteria.where("longitude").gte(start).lte(end));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findByType(String type) {
        Query query = Query.query(Criteria.where("type").is(type));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findByTimestamp(long timestamp) {
        Query query = Query.query(Criteria.where("timestamp").is(timestamp));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findByTimestampBetween(long startTimestamp, long endTimestamp) {
        Query query = Query.query(Criteria.where("timestamp").gte(startTimestamp).lte(endTimestamp));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<ShipInfo> findShipDetail(String targetId, int mmsi) {
        Query query = new Query();
        query.addCriteria(Criteria.where("targetId").is(targetId).and("mmsi").is(mmsi));
        return mongoTemplate.find(query, ShipInfo.class);
    }

    @Override
    public List<Ship> findByLatitudeBetweenAndLongitudeBetween(double startLat, double endLat, double startLon, double endLon) {
        Query query = Query.query(Criteria.where("latitude").gte(startLat).lte(endLat)
                .and("longitude").gte(startLon).lte(endLon));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findBySpeedBetween(double minSpeed, double maxSpeed) {
        Query query = Query.query(Criteria.where("speed").gte(minSpeed).lte(maxSpeed));
        return mongoTemplate.find(query, Ship.class);
    }


    @Override
    public List<Ship> findByState(int state) {
        Query query = Query.query(Criteria.where("state").is(state));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findByLengthGreaterThan(int length) {
        Query query = Query.query(Criteria.where("length").gt(length));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findByLength(int length) {
        Query query = Query.query(Criteria.where("length").is(length));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findBySpeedLessThan(double speed) {
        Query query = Query.query(Criteria.where("speed").lt(speed));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findByMmsiIn(List<Integer> mmsiList) {
        Query query = Query.query(Criteria.where("mmsi").in(mmsiList));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> findByLengthBetween(double minLength, double maxLength) {
        Query query = Query.query(Criteria.where("length").gte(minLength).lte(maxLength));
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public List<Ship> searchShips(Query query) {
        return mongoTemplate.find(query, Ship.class);
    }

    @Override
    public Page<Ship> findByStatePage(int state, Pageable pageable) {
        Query query = Query.query(Criteria.where("state").is(state));
        long total = mongoTemplate.count(query, Ship.class);//计算满足查询条件的船舶总数
//        使用pageable对象设置查询的分页信息，包括页码、每页大小和排序规则。
        query.with(pageable);

        List<Ship> ships = mongoTemplate.find(query, Ship.class);
//        将查询结果、分页信息和总记录数封装到PageImpl对象中，并返回该对象作为查询结果
        return new PageImpl<>(ships, pageable, total);
    }

    @Override
    public <S extends Ship> S insert(S entity) {
        return null;
    }

    @Override
    public <S extends Ship> List<S> insert(Iterable<S> entities) {
        return null;
    }

    @Override
    public <S extends Ship> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Ship> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends Ship> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public <S extends Ship> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Ship> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Ship> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends Ship, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends Ship> S save(S entity) {
        return null;
    }

    @Override
    public <S extends Ship> List<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<Ship> findById(String s) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(String s) {
        return false;
    }

    @Override
    public List<Ship> findAll() {
        return null;
    }

    @Override
    public List<Ship> findAllById(Iterable<String> strings) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(String s) {

    }

    @Override
    public void delete(Ship entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends String> strings) {

    }

    @Override
    public void deleteAll(Iterable<? extends Ship> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<Ship> findAll(Sort sort) {
        return null;
    }

    @Override
    public Page<Ship> findAll(Pageable pageable) {
        return null;
    }
}
