package com.devskill.service.crawler;

import us.codecraft.webmagic.processor.PageProcessor;

public interface SpiderService {

    void crawl(String url, PageProcessor pageProcessor);

}
