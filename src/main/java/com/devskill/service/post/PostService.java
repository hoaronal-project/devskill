package com.devskill.service.post;

import com.devskill.domain.Post;
import com.devskill.model.PostSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

public interface PostService {

    Post add(Post post) throws IOException;

    Page<Post> getPosts(PostSearchRequest request, Pageable pageable);

    Post getPostById(Long id);

    List<Post> findByCodeIn(List<String> codes);

    Post getPostByCode(String code);
}
