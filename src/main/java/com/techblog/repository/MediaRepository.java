package com.techblog.repository;

import com.techblog.domain.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;

@Repository
@Transactional
public interface MediaRepository extends JpaRepository<Media, String> {

	Media findOneById(String id);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	Media findOneForUpdateById(String id);
}
