/**
 * Written by minhhq
 */

package com.backend.project.repository;

import com.backend.project.model.PaymentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentLogRepository extends JpaRepository<PaymentLog, Long> {
    @Query(
            value = "SELECT * FROM PAYMENT_LOG WHERE STATUS = 'SUCCESS' AND USERNAME = ?1 ORDER BY PAYMENT_TIME DESC", nativeQuery = true)
    List<PaymentLog> findSuccess(@Param("username") String username);

    @Query(
            value = "SELECT * FROM PAYMENT_LOG WHERE STATUS = 'CANCEL'  AND USERNAME = ?1 ORDER BY PAYMENT_TIME DESC", nativeQuery = true)
    List<PaymentLog> findCancle(@Param("username") String username);
}