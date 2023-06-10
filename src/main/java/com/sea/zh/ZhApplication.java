package com.sea.zh;

import okhttp3.OkHttpClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ZhApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZhApplication.class, args);

    }
//    使用@Bean注解定义一个OkHttpClient的Bean，以便后续使用
    @Bean
    public OkHttpClient okHttpClient() {
        return new OkHttpClient();
    }

}
