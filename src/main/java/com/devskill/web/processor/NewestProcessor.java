package com.devskill.web.processor;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.selector.Selectable;

import com.devskill.common.utils.StringUtil;

@Component
@RequiredArgsConstructor
public class NewestProcessor implements PageProcessor {

    private Site site = Site.me()
      .setDomain("viblo.asia")
      .setSleepTime(100)
      .setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36");

    public static final String list = "https://viblo.asia/newest";

    @Override
    public void process(Page page) {
        if (page.getUrl().regex(list).match()) {
            List<Selectable> list = page.getHtml().xpath("//div[@class='post-feed']/div[@class='post-feed-item']").nodes();
            Function<Selectable, String> LINK_PROJECTION = x -> StringUtil.covertStringToURL(x.xpath("//div[@class='post-title--inline']/h3").links().toString());

            List<String> linkNewPost = convertAll(list, LINK_PROJECTION);

        }
    }

    @Override
    public Site getSite() {
        return site;
    }

    public static <Source, Result> List<Result> convertAll(List<Source> source, Function<Source, Result> projection) {
        ArrayList<Result> results = new ArrayList<>();
        for (Source element : source) {
            results.add(projection.apply(element));
        }
        return results;
    }
}