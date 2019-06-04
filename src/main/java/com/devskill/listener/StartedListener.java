package com.devskill.listener;

import com.devskill.domain.Tag;
import com.devskill.service.tag.TagService;
import com.google.common.cache.Cache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Slf4j
@Configuration
public class StartedListener implements ApplicationListener<ApplicationStartedEvent> {

    private final TagService tagService;

    private final Cache<Object, Object> fileSystemPersistingCache;

    public StartedListener(TagService tagService, Cache<Object, Object> fileSystemPersistingCache) {
        this.tagService = tagService;
        this.fileSystemPersistingCache = fileSystemPersistingCache;
    }

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
        log.info("Load data ===========>>>");
        fileSystemPersistingCache.put("tagList", tagService.findAll());
        List<Tag> tagList = (List<Tag>) fileSystemPersistingCache.getIfPresent("tagList");

    }
}
