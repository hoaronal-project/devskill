package com.techblog.schedule;

import com.techblog.service.SpiderService;
import com.techblog.web.pipeline.PostPipeline;
import com.techblog.web.processor.PostProcessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Slf4j
@Component
@RequiredArgsConstructor
public class SpiderSchedule {

    private final SpiderService spiderService;

    @Resource
    private PostPipeline postPipeline;

    /*@Scheduled(cron = "0 0/1 * 1/1 * ?")
    public void scheduleTaskWithFixedRate() {
        log.info("hello");
        spiderService.crawl("https://viblo.asia/newest");
    }*/

    @Scheduled(cron = "0 0/1 * 1/1 * ?")
    public void crawlViblo() {
        spiderService.crawl("https://viblo.asia/newest", new PostProcessor(), postPipeline);
        /*Spider spider = Spider.create(new PostProcessor());
        spider.addUrl("https://viblo.asia/newest");
        spider.thread(5);
        spider.setExitWhenComplete(true);
        spider.start();
        spider.stop();*/
    }
}
