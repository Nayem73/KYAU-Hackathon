package com.javafest.backend.repository;

import com.javafest.backend.model.Garbage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GarbageRepository extends JpaRepository<Garbage, Long> {
    Garbage findGarbageById(Long id);

    Garbage findByTitle(String title);
}
