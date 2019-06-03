package com.devskill.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.devskill.domain.Post;

@Repository
@Transactional
public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom  {

	List<Post> findByCodeIn(List<String> codes);

	@Query("select post from Post post where post.code = :code ")
	Post findOneByCode(@Param("code") String code);

	@Query("select count(post.id) from Post post where post.language = :language ")
	long count(@Param("language") String language);
}
