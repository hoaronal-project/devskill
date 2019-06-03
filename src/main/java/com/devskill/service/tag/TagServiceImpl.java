package com.devskill.service.tag;

import com.devskill.common.exception.DuplicateNameException;
import com.devskill.domain.Tag;
import com.devskill.model.TagCreateRequest;
import com.devskill.repository.TagRepository;
import com.devskill.web.support.AuthorizedUser;
import lombok.extern.slf4j.Slf4j;
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
