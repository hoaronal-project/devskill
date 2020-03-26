package com.blog.app.repository;

import com.blog.app.domain.Operation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {

    @Query(value = "select distinct operation from Operation operation left join fetch operation.labels",
        countQuery = "select count(distinct operation) from Operation operation")
    Page<Operation> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct operation from Operation operation left join fetch operation.labels")
    List<Operation> findAllWithEagerRelationships();

    @Query("select operation from Operation operation left join fetch operation.labels where operation.id =:id")
    Optional<Operation> findOneWithEagerRelationships(@Param("id") Long id);
}
