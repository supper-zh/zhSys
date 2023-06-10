package com.sea.zh.model;

import java.util.List;
public class HistoryData {
    private int code;
    private String msg;
    private List<HistoryItem> data;

    // 添加 getter 和 setter 方法

    public void setCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setData(List<HistoryItem> data) {
        this.data = data;
    }

    public List<HistoryItem> getData() {
        return data;
    }

    @Override
    public String toString() {
        return "HistoryData{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }

    public static class HistoryItem {
        private int mmsi;
        private long lastTm;
        private float speed;
        private double longitude;
        private double latitude;
        private float course;
        private String sclass;

        // 添加 getter 和 setter 方法

        public int getMmsi() {
            return mmsi;
        }

        public void setMmsi(int mmsi) {
            this.mmsi = mmsi;
        }

        public long getLastTm() {
            return lastTm;
        }

        public void setLastTm(long lastTm) {
            this.lastTm = lastTm;
        }

        public float getSpeed() {
            return speed;
        }

        public void setSpeed(float speed) {
            this.speed = speed;
        }

        public double getLongitude() {
            return longitude;
        }

        public void setLongitude(double longitude) {
            this.longitude = longitude;
        }

        public double getLatitude() {
            return latitude;
        }

        public void setLatitude(double latitude) {
            this.latitude = latitude;
        }

        public float getCourse() {
            return course;
        }

        public void setCourse(float course) {
            this.course = course;
        }

        public String getSclass() {
            return sclass;
        }

        public void setSclass(String sclass) {
            this.sclass = sclass;
        }
    }
}
