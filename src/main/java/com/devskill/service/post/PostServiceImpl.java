package com.devskill.service.post;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devskill.domain.Post;
import com.devskill.model.PostSearchRequest;
import com.devskill.repository.PostRepository;
import com.devskill.common.exception.CoreException;

@Service
@Transactional(rollbackFor = Exception.class)
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Post add(Post post) {
        if (checkDuplicateCode(post.getCode())) {
            throw new CoreException("Duplicate code!", HttpStatus.BAD_REQUEST);
        }
        post = postRepository.save(post);
        return post;
    }

    @Override
    public Page<Post> getPosts(PostSearchRequest request, Pageable pageable) {
        Page<Post> page = new PageImpl<>(postRepository.findAll());
        return page;
    }

    @Override
    public Post getPostById(Long id) {
        return postRepository.findById(id).get();
    }

    @Override
    public List<Post> findByCodeIn(List<String> codes) {
        return postRepository.findByCodeIn(codes);
    }

    @Override
    public Post getPostByCode(String code) {
        return postRepository.findOneByCode(code);
    }

    public boolean checkDuplicateCode(String code) {
        return postRepository.findOneByCode(code) == null ? false : true;
    }
}
