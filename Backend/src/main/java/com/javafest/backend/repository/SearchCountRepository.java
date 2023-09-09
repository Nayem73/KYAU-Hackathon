package com.javafest.backend.repository;

import com.javafest.backend.model.SearchCount;
import com.javafest.backend.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchCountRepository extends JpaRepository<SearchCount, Long> {
    SearchCount findByUserInfo(UserInfo userInfo);
}
