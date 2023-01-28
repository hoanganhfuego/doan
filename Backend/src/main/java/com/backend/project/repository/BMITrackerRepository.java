/**
 * Written by minhhq
 */

package com.backend.project.repository;

import com.backend.project.model.BMITracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BMITrackerRepository extends JpaRepository<BMITracker, Long> {
    @Query(
            value = "SELECT * FROM BMITRACKER WHERE USERNAME = ?1 ORDER BY CALDATE ASC", nativeQuery = true)
    List<BMITracker> findBMI(@Param("username") String username);
}
