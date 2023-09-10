package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.Employment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmploymentRepository extends JpaRepository<Employment, Long> {
    Page<Employment> findAll(Pageable pageable);
}
