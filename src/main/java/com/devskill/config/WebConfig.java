package com.devskill.config;

import com.devskill.interceptor.AdminInterceptor;
import com.devskill.interceptor.GuestInterceptor;
import com.devskill.interceptor.SessionAdminInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final SessionAdminInterceptor sessionAdminInterceptor;

    private final AdminInterceptor adminInterceptor;

    private final GuestInterceptor guestInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(guestInterceptor).addPathPatterns("/**");
        registry.addInterceptor(adminInterceptor).addPathPatterns("/_admin/**");
        registry.addInterceptor(sessionAdminInterceptor).addPathPatterns("/_admin/**");

    }
}
