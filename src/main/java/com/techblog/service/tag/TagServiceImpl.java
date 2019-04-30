package com.techblog.service.tag;

import com.techblog.domain.Tag;
import com.techblog.repository.TagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class TagServiceImpl implements TagService {

    private TagRepository tagRepository;

    private static final Logger logger = LoggerFactory.getLogger(TagServiceImpl.class);

    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    @Transactional(readOnly = false)
    public Tag add(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public List<Tag> findAll() {
        return tagRepository.findAll();
    }
}
