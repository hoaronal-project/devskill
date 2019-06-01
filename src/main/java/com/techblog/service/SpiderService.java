package com.techblog.service;

import us.codecraft.webmagic.pipeline.Pipeline;
import us.codecraft.webmagic.processor.PageProcessor;

public interface SpiderService {

    void crawl(String url, PageProcessor pageProcessor, Pipeline pipeline);

}
