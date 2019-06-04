package com.devskill.crawler.processor;

import com.devskill.common.utils.StringUtils;
import com.devskill.domain.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.selector.Selectable;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PostProcessor implements PageProcessor {

    @Override
    public void process(Page page) {
        List<Selectable> list = page.getHtml().xpath("//div[@class='post-feed']/div[@class='post-feed-item']").nodes();
        for (Selectable s : list) {
            String title = s.xpath("//div[@class='post-title--inline']/h3/a/text()").toString();
            String link = s.xpath("//div[@class='post-title--inline']/h3").links().toString();
            if (org.apache.commons.lang3.StringUtils.isNotEmpty(title) && org.apache.commons.lang3.StringUtils.isNotEmpty(link)) {
                Post news = new Post();
                news.setTitle(title);
                news.setBody(title);
                news.setCode(StringUtils.covertStringToURL(title));
                page.putField("newPostViblo" + title, news);
            }
        }

    }

    @Override
    public Site getSite() {
        return null;
    }
}
