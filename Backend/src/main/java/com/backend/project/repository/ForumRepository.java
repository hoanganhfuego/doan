/**
 * Written by minhhq
 */

package com.backend.project.repository;

import com.backend.project.model.Forum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ForumRepository extends JpaRepository<Forum, Long>, PagingAndSortingRepository<Forum, Long> {
    @Query(
            value = "SELECT * FROM FORUM INNER join FORUMDETAIL on forum.postid = forumdetail.dpostid ORDER BY CTIME DESC", nativeQuery = true)
    Page<Forum> findAllForum(Pageable pageable);

    @Query(
            value = "SELECT * FROM FORUM INNER join FORUMDETAIL on forum.postid = forumdetail.dpostid WHERE POSTID=?1", nativeQuery = true)
    List<Forum> findForumDetail(@Param("postid") int postid);

    @Query(
            value = "SELECT COUNT(*) FROM FORUM WHERE TITLE = ?1", nativeQuery = true)
    int existsByTitle(@Param("title") String title);

    @Query(
            value = "SELECT * FROM FORUM INNER join FORUMDETAIL on forum.postid = forumdetail.dpostid WHERE LOWER(TITLE) LIKE '%'||?1||'%'", nativeQuery = true)
    Page<Forum> searchForum(@Param("value") String value, Pageable pageable);

    @Query(
            value = "select count(*) from FORUM", nativeQuery = true)
    int countNumofForum();

}
