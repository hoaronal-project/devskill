package com.devskill.repository;

import com.devskill.domain.Post;
import com.devskill.model.PostSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepositoryCustom {

    void lock(long id);

    Page<Post> search(PostSearchRequest request, Pageable pageable);
}
