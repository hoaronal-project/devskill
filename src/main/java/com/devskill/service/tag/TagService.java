package com.devskill.service.tag;

import com.devskill.domain.Tag;
import com.devskill.model.TagCreateRequest;
import com.devskill.web.support.AuthorizedUser;

import java.util.List;

public interface TagService {

    public List<Tag> findAll();

    public Tag add(TagCreateRequest request, AuthorizedUser authorizedUser);
}
