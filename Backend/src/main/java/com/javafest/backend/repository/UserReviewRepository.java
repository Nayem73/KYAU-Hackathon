package com.javafest.backend.repository;

import com.javafest.backend.model.UserReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReviewRepository extends JpaRepository<UserReview, Long> {
    Page<UserReview> findAll(Pageable pageable);
}

