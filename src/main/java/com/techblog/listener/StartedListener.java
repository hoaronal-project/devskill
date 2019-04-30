package com.techblog.listener;

import com.techblog.common.constant.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Slf4j
@Configuration
public class StartedListener implements ApplicationListener<ApplicationStartedEvent> {

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        System.out.println("hoa hahaha");
        Constants.TAGS = Arrays.asList("Java","Php", "C#");
        log.info("The scheduled task starts successfully!");
    }
}
