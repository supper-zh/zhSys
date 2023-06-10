//package com.sea.zh.utils;
//
//
//import com.sea.zh.service.TokenService;
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.stereotype.Component;
//
//
////使用了 @Component 注解来标记这个类是一个 Spring Bean。
//// 实现了 ApplicationRunner 接口，这个接口提供了一个 run() 方法，它会在 Spring Boot 应用程序启动时自动运行。
//@Component
//public class MyApplicationRunner implements ApplicationRunner {
//    private final TokenService tokenService;
////    public static String token;
//
//    public MyApplicationRunner(TokenService tokenService) {
//        this.tokenService = tokenService;
//    }
//
//    @Override
//    public void run(ApplicationArguments args) throws Exception {
//        String token = tokenService.getToken();
//
////        Timer timer = new Timer();
//////        设置每隔6小时刷新一次token
////        timer.schedule(new TimerTask() {
////            public void run() {
////                try {
////                    token = tokenService.getToken();
////                } catch (IOException e) {
////                    throw new RuntimeException(e);
////                }
////            }
////        }, 0, 6 * 60 * 60 * 1000);
//
//    }
//}
