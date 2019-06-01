package com.techblog.web.processor;

import com.techblog.common.utils.StringUtil;
import com.techblog.domain.Post;
import org.apache.commons.lang3.StringUtils;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.selector.Selectable;

import java.util.List;

public class PostProcessor implements PageProcessor {

    private Site site = Site.me()
            .setDomain("viblo.asia")
            .setSleepTime(100)
            .setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36");

    public static final String list = "https://viblo.asia/newest";

    @Override
    public void process(Page page) {
        if (page.getUrl().regex(list).match()) {
            List<Selectable> list = page.getHtml().xpath("//div[@class='post-feed']/div[@class='post-feed-item']").nodes();
            for (Selectable s : list) {
                String title = s.xpath("//div[@class='post-title--inline']/h3/a/text()").toString();
                String link = s.xpath("//div[@class='post-title--inline']/h3").links().toString();

                /*Spider spider = Spider.create(new PostProcessor());
                spider.addUrl(link);
                spider.addPipeline(newsPipeline);
                spider.thread(5);
                spider.setExitWhenComplete(true);
                spider.start();
                spider.stop();*/

                if (StringUtils.isNotEmpty(title) && StringUtils.isNotEmpty(link)) {
                    Post news = new Post();
                    news.setTitle(title);
                    news.setBody(title);
                    news.setCode(StringUtil.covertStringToURL(title));
                    /*news.setInfo(title);
                    news.setLink(link);
                    news.setTypeId(Constant.Type_ZhiHu);
                    news.setSources(new Sources(Constant.Sources_ZhiHu));*/
                    page.putField("newPostViblo" + title, news);
                }
            }
        }
    }

    @Override
    public Site getSite() {
        return site;
    }
}