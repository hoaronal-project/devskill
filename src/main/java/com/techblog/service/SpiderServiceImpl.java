package com.techblog.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.pipeline.Pipeline;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.scheduler.FileCacheQueueScheduler;

import javax.annotation.Resource;

@Service
public class SpiderServiceImpl implements SpiderService {

    public static Logger logger = LoggerFactory.getLogger(SpiderServiceImpl.class);

    @Override
    public void crawl(String url, PageProcessor pageProcessor, Pipeline pipeline) {

        final String startUrl = url;

        Spider.create(pageProcessor)
                .addUrl(startUrl)
                //.setScheduler(new FileCacheQueueScheduler("/home/hoaronal/project/logs"))
                .addPipeline(pipeline)
                .thread(5)
                .run();

    }
}
