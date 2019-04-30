package com.techblog.repository;

import com.techblog.domain.Post;
import com.techblog.model.PostSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

public class PostRepositoryImpl implements PostRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void lock(long id) {
        /*CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<Post> root = query.from(Post.class);
        query.select(root.get(Post_.id));
        query.where(cb.equal(root.get(Post_.id), id));
        entityManager.createQuery(query).setLockMode(LockModeType.PESSIMISTIC_WRITE).getSingleResult();*/
    }

    @Override
    public Page<Post> search(PostSearchRequest request, Pageable pageable) {
        int resultSize = 0;
        List<Post> results = new ArrayList<>();
        results.add(new Post());
        return new PageImpl<>(results, pageable, resultSize);
    }
}
