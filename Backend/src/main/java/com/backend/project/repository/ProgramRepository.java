/**
 * Written by minhhq
 */

package com.backend.project.repository;

import com.backend.project.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProgramRepository extends JpaRepository<Program, Long> {
    @Query(
            value = "SELECT * FROM PROGRAM WHERE TYPE = 'MUSCLE'", nativeQuery = true)
    List<Program> findMuscle();

    @Query(
            value = "SELECT * FROM PROGRAM WHERE TYPE = 'TARGET'", nativeQuery = true)
    List<Program> findTarget();

    @Query(
            value = "SELECT * FROM PROGRAM WHERE LABEL = ?1", nativeQuery = true)
    List<Program> BMI(@Param("label") String label);
}
