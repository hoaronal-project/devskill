package com.techblog.service.tag;

import com.techblog.domain.Tag;
import com.techblog.model.TagCreateRequest;
import com.techblog.web.support.AuthorizedUser;
import org.springframework.cache.annotation.CacheEvict;

import java.time.LocalDateTime;
import java.util.List;

public interface TagService {

    public List<Tag> findAll();

    public Tag add(TagCreateRequest request, AuthorizedUser authorizedUser);
}
