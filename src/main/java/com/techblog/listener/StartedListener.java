package com.techblog.listener;

import com.techblog.common.constant.Constants;
import com.techblog.domain.Tag;
import com.techblog.service.tag.TagService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.BeanToPropertyValueTransformer;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Slf4j
@Configuration
public class StartedListener implements ApplicationListener<ApplicationStartedEvent> {

    private final TagService tagService;

    public StartedListener(TagService tagService) {
        this.tagService = tagService;
    }

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        log.info("Load data ===========>>>");
        List<Tag> tags = tagService.findAll();
        Constants.TAGS = (List<String>) CollectionUtils.collect(tags,
                new BeanToPropertyValueTransformer("name"));

    }
}
