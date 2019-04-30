package com.techblog.repository;

import com.techblog.domain.UserInvitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;

@Repository
@Transactional
public interface UserInvitationRepository extends JpaRepository<UserInvitation, String> {
	
	UserInvitation findOneByToken(String token);
	
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	UserInvitation findOneForUpdateByToken(String token);
}
