package com.devskill.schedule;

import com.devskill.service.crawler.SpiderService;
import com.devskill.crawler.processor.NewestProcessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SpiderSchedule {

    private final SpiderService spiderService;

    private final NewestProcessor postProcessor;



    @Scheduled(cron = "0 0/1 * 1/1 * ?")
    public void crawlViblo() {
        spiderService.crawl("https://viblo.asia/newest", postProcessor);
    }
}
