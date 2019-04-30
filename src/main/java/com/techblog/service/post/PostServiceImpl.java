package com.techblog.service.post;

import com.techblog.common.exception.CoreException;
import com.techblog.domain.Post;
import com.techblog.model.PostSearchRequest;
import com.techblog.repository.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class PostServiceImpl implements PostService {

    private PostRepository postRepository;

    private static final Logger logger = LoggerFactory.getLogger(PostServiceImpl.class);

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    @Transactional(readOnly = false, rollbackFor = Exception.class)
    public Post add(Post post) {
        if(checkDuplicateCode(post.getCode())){
            throw new CoreException("Duplicate code!", HttpStatus.BAD_REQUEST);
        }
        post = postRepository.save(post);
        return post;
    }

    public boolean checkDuplicateCode(String code){
        return postRepository.findOneByCode(code) == null ? false : true;
    }

    @Override
    public Page<Post> getPosts(PostSearchRequest request, Pageable pageable) {
        Page<Post> page = new PageImpl<>(postRepository.findAll());
        return page;
        //return postRepository.search(request, pageable);
    }

    @Override
    public Post getPostById(Long id) {
        return postRepository.findById(id).get();
    }

    @Override
    public Post getPostByCode(String code) {
        return postRepository.findOneByCode(code);
    }
}
