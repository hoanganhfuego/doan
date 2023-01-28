/**
 * Written by minhhq
 */

package com.backend.project.repository;

import com.backend.project.model.ListWorkout;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ListWorkoutRepository extends JpaRepository<ListWorkout, Long> {
    @Query(
            value = "SELECT * FROM LISTWORKOUT WHERE LABEL=?1", nativeQuery = true)
    List<ListWorkout> findListDueLabel(@Param("label") String label);

    @Query(
            value = "SELECT * FROM LISTWORKOUT WHERE NAME=?1", nativeQuery = true)
    List<ListWorkout> findVideoDueName(@Param("name") String name);

    @Query(
            value = "SELECT * FROM LISTWORKOUT", nativeQuery = true)
    Page<ListWorkout> findVideo(Pageable pageable);

    @Query(
            value = "SELECT * FROM LISTWORKOUT WHERE LOWER(NAME) LIKE '%'||?1||'%'", nativeQuery = true)
    Page<ListWorkout> searchVideo(@Param("value") String value, Pageable pageable);
}
