package com.devskill.config;

import com.devskill.interceptor.SessionAdminInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private SessionAdminInterceptor adminInterceptor;

    /*@Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(adminInterceptor).addPathPatterns("/_admin/**");
    }*/

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
