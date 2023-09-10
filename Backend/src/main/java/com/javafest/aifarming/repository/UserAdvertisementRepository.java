package com.javafest.aifarming.repository;

import com.javafest.aifarming.model.UserAdvertisement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAdvertisementRepository extends JpaRepository<UserAdvertisement, Long> {
    Page<UserAdvertisement> findAll(Pageable pageable);
}
