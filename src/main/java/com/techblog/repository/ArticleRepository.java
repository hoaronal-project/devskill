package com.techblog.repository;

import com.techblog.domain.Article;
import com.techblog.domain.Post;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Repository
@Transactional
public interface ArticleRepository extends JpaRepository<Article, Long> {

	@EntityGraph(value = Article.DEEP_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	Article findOne(Specification<Article> spec);

	@EntityGraph(value = Article.DEEP_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	Article findOneById(Long id);

	@EntityGraph(value = Article.DEEP_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	Article findOneByIdAndLanguage(Long id, String language);

	@EntityGraph(value = Article.DEEP_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	Article findOneByCodeAndLanguage(String code, String language);

	@EntityGraph(value = Article.SHALLOW_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	List<Article> findAllByIdIn(Collection<Long> ids);

	@Query("select count(article.id) from Article article where article.language = :language and article.drafted is null ")
	long count(@Param("language") String language);

	@Query("select count(article.id) from Article article where article.status = :status and article.language = :language and article.drafted is null ")
	long countByStatus(@Param("status") Post.Status status, @Param("language") String language);

	@Query(
			"select new map(user.id as userId, count(article.id) as count) from Article article " +
			"left join article.author user " +
			"where article.status = :status and article.language = :language " +
			"group by user.id ")
	List<Map<String, Object>> countByAuthorIdGrouped(@Param("status") Post.Status status, @Param("language") String language);

	@Query(
			"select new map(category.id as categoryId, count(article.id) as count) from Article article " +
			"left join article.categories category " +
			"where article.status = :status and article.language = :language " +
			"group by category.id ")
	List<Map<String, Object>> countByCategoryIdGrouped(@Param("status") Post.Status status, @Param("language") String language);

	@Query(
			"select new map(tag.id as tagId, count(article.id) as count) from Article article " +
			"left join article.tags tag " +
			"where article.status = :status and article.language = :language " +
			"group by tag.id ")
	List<Map<String, Object>> countByTagIdGrouped(@Param("status") Post.Status status, @Param("language") String language);

	@Modifying
	@Query("delete Article article where article.drafted = :drafted ")
	void deleteByDrafted(@Param("drafted") Article drafted);
}