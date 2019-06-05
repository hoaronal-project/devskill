package com.devskill.repository;

import com.devskill.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

	//	@EntityGraph(value = User.DEEP_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	User findOneById(Long id);

	//	@EntityGraph(value = User.DEEP_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	User findOneForUpdateById(Long id);

	//	@EntityGraph(value = User.DEEP_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	User findOneByLoginId(String loginId);

	//	@EntityGraph(value = User.DEEP_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	Optional<User> findOneByEmail(String email);

	//	@EntityGraph(value = User.SHALLOW_GRAPH_NAME, type = EntityGraph.EntityGraphType.FETCH)
	List<User> findAllByIdIn(Collection<Long> ids);

	@Modifying
	@Query("update User set lastLoginTime = :lastLoginTime where loginId = :loginId ")
	int updateLastLoginTime(@Param("loginId") String loginId, @Param("lastLoginTime") Date lastLoginTime);
}
