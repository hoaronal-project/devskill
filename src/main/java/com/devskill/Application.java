package com.devskill;

import java.util.Locale;

import com.devskill.common.cache.FileSystemCacheBuilder;
import com.google.common.cache.Cache;
import com.google.common.cache.LoadingCache;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

/*@EnableScheduling*/
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver slr = new SessionLocaleResolver();
        slr.setDefaultLocale(Locale.US);
        return slr;
    }

    @Bean
    public Cache<Object, Object> cache() {
        return FileSystemCacheBuilder.newBuilder()
          .maximumSize(1L)
          .build();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}