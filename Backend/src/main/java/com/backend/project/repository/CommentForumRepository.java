/**
 * Written by minhhq
 */

package com.backend.project.repository;

import com.backend.project.model.CommentForum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentForumRepository extends JpaRepository<CommentForum, Long>  {
    @Query(
            value = "SELECT * FROM COMMENTFORUM", nativeQuery = true)
    List<CommentForum> findAllComment();

    @Query(
            value = "SELECT * FROM COMMENTFORUM WHERE CID=?1 ORDER BY CCTIME DESC", nativeQuery = true)
    List<CommentForum> findAllCommentByForum(@Param("CID") int CID);
}
