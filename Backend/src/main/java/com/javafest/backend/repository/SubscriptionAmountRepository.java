package com.javafest.backend.repository;

import com.javafest.backend.model.SubscriptionAmount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionAmountRepository extends JpaRepository<SubscriptionAmount, Long> {
}
