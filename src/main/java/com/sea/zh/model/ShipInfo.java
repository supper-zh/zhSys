package com.sea.zh.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * 船舶详细信息实体类
 */
@Document(collection = "shipDetail")
public class ShipInfo {
    @Id
    private String id;
    //ais 动态信息在websocket中就体现了====ship类
    private String targetId; // 目标ID@
    private double mmsi; // MMSI@
    private double length; // 长度@
    private double imo; // AIS IMO

    private long timestamp; // 时间戳@
    private String callSign; // 呼号@
    private int shipClass; // AIS级别
    private String vendorId; // 制造商
    private int shipType; // 船的类型
    private String vesselName; // 船名
    private double width; // 船的宽度
    private String nationality; // 国籍
    private String destination; // 目的港
    private double draught; // 吃水

    private String etaTime;

    // Getter and Setter methods

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return "ShipDetail{" +
                "id='" + id + '\'' +
                ", targetId='" + targetId + '\'' +
                ", mmsi=" + mmsi +
                ", length=" + length +
                ", imo=" + imo +
                ", timestamp=" + timestamp +
                ", callSign='" + callSign + '\'' +
                ", shipClass=" + shipClass +
                ", vendorId='" + vendorId + '\'' +
                ", shipType=" + shipType +
                ", vesselName='" + vesselName + '\'' +
                ", width=" + width +
                ", nationality='" + nationality + '\'' +
                ", destination='" + destination + '\'' +
                ", draught=" + draught +
                ", etaTime='" + etaTime + '\'' +
                '}';
    }

    public String getEtaTime() {
        return etaTime;
    }

    public void setEtaTime(String etaTime) {
        this.etaTime = etaTime;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTargetId() {
        return targetId;
    }

    public void setTargetId(String targetId) {
        this.targetId = targetId;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public double getMmsi() {
        return mmsi;
    }

    public void setMmsi(double mmsi) {
        this.mmsi = mmsi;
    }

    public double getImo() {
        return imo;
    }

    public void setImo(double imo) {
        this.imo = imo;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getCallSign() {
        return callSign;
    }

    public void setCallSign(String callSign) {
        this.callSign = callSign;
    }

    public int getShipClass() {
        return shipClass;
    }

    public void setShipClass(int shipClass) {
        this.shipClass = shipClass;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public int getShipType() {
        return shipType;
    }

    public void setShipType(int shipType) {
        this.shipType = shipType;
    }

    public String getVesselName() {
        return vesselName;
    }

    public void setVesselName(String vesselName) {
        this.vesselName = vesselName;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public double getDraught() {
        return draught;
    }

    public void setDraught(double draught) {
        this.draught = draught;
    }

    // ...

}
