/**
 * Written by minhhq
 */

package com.backend.project.controller;

import com.backend.project.model.CommentForum;
import com.backend.project.payload.response.MessageResponse;
import com.backend.project.repository.CommentForumRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/")
public class CommentForumController {
    private static Logger logger = Logger.getLogger(CommentForumController.class);

    @Autowired
    private CommentForumRepository commentForumRepository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @PostMapping("/comment")
    public ResponseEntity<?> saveCmt(@RequestBody CommentForum commentForum) {
        jdbcTemplate.update("INSERT INTO COMMENTFORUM (UNAME, CCOMMENT, CTITLE, CID) VALUES ('" + commentForum.getUname() + "', '" + commentForum.getCcomment() + "', (SELECT TITLE FROM FORUM WHERE POSTID = '" + commentForum.getCid() + "'), '" + commentForum.getCid() + "')");
        logger.info("Comment from " + commentForum.getUname() + " is add on post " + commentForum.getCtitle() + " in forum!");
        return new ResponseEntity<>(new MessageResponse("Comment added successfully!"), HttpStatus.CREATED);
    }

    @GetMapping("/comment")
    public List<CommentForum> getForum() {
        return commentForumRepository.findAllComment();
    }

    @GetMapping("/comment/{cid}")
    public List<CommentForum> getForum(@PathVariable(value = "cid") int cid) {
        logger.info("Get all comment of the post " + cid + " in forum");
        return commentForumRepository.findAllCommentByForum(cid);
    }
}
