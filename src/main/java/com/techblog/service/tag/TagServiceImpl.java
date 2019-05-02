package com.techblog.service.tag;

import com.techblog.common.exception.DuplicateNameException;
import com.techblog.domain.Tag;
import com.techblog.model.TagCreateRequest;
import com.techblog.repository.TagRepository;
import com.techblog.web.support.AuthorizedUser;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class TagServiceImpl implements TagService {

    private TagRepository tagRepository;

    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public List<Tag> findAll() {
        return tagRepository.findAll();
    }

    @Override
    @Transactional(rollbackFor = Exception.class, readOnly = false)
    public Tag add(TagCreateRequest request, AuthorizedUser authorizedUser) {
        log.info("Create tag ========>>>>>>");
        Tag duplicate = tagRepository.findOneByNameAndLanguage(request.getName(), request.getLanguage());
        if (duplicate != null) {
            throw new DuplicateNameException(request.getName());
        }

        Tag tag = new Tag();
        LocalDateTime now = LocalDateTime.now();

        tag.setName(request.getName());
        tag.setLanguage(request.getLanguage());

        tag.setCreatedAt(now);
        tag.setCreatedBy(authorizedUser.getUsername());
        tag.setUpdatedAt(now);
        tag.setUpdatedBy(authorizedUser.getUsername());
        return tagRepository.saveAndFlush(tag);
    }
}
