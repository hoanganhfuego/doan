/**
 * Written by minhhq
 */

package com.backend.project.repository;

import com.backend.project.model.Linktemp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LinkTempRepository extends JpaRepository<Linktemp, Long> {
    @Query(
            value = "SELECT * FROM linktemp WHERE create_time = (SELECT MAX(CREATE_TIME) FROM LINKTEMP)", nativeQuery = true)
    List<Linktemp> findLink();
}
