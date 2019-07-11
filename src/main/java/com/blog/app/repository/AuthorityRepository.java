package com.blog.app.repository;

import com.blog.app.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
