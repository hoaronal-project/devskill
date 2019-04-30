package com.techblog.service.tag;

import com.techblog.domain.Tag;

import java.util.List;

public interface TagService {

    public Tag add(Tag tag);

    public List<Tag> findAll();
}
