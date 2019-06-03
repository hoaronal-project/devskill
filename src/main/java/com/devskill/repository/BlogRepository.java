package com.devskill.repository;

import com.devskill.domain.Blog;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;

@Repository
@Transactional
public interface BlogRepository extends JpaRepository<Blog, Long> {

	@EntityGraph(value = Blog.DEEP_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	Blog findOneById(Long id);

	@EntityGraph(value = Blog.DEEP_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	Blog findOneForUpdateById(Long id);
}
