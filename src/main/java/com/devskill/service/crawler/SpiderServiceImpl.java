package com.devskill.service.crawler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.processor.PageProcessor;

@Service
public class SpiderServiceImpl implements SpiderService {

    public static Logger logger = LoggerFactory.getLogger(SpiderServiceImpl.class);

    @Override
    public void crawl(String url, PageProcessor pageProcessor) {
        Spider.create(pageProcessor)
          .addUrl(url)
          //.setScheduler(new FileCacheQueueScheduler("/home/hoaronal/project/logs"))
          //.addPipeline(pipeline)
          .thread(5)
          .run();
    }
}
