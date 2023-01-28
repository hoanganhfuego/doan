/**
 * Written by minhhq
 */

package com.backend.project.controller;

import com.backend.project.model.Forum;
import com.backend.project.payload.response.CountResponse;
import com.backend.project.payload.response.MessageResponse;
import com.backend.project.repository.ForumRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.sql.*;
import java.util.List;
import java.util.Locale;
import java.util.Properties;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/")
public class ForumController {
    private static Logger logger = Logger.getLogger(ForumController.class);

    @Autowired
    private ForumRepository forumRepository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/forum")
    public Page<Forum> getForumPage(Pageable pageable) {
        logger.info("Getting all forum!");
        return forumRepository.findAllForum(pageable);
    }

    @GetMapping("/forum/{postid}")
    public List<Forum> getForumDetail(@PathVariable(value = "postid") int postid) {
        logger.info("Getting forum detail!");
        return forumRepository.findForumDetail(postid);
    }

    @PostMapping("/forum")
    public ResponseEntity<?> createForum(@RequestBody Forum forum) throws SQLException, ClassNotFoundException {
        if (forumRepository.existsByTitle(forum.getTitle()) == 1) {
            logger.error("Error: Forum is already added!");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Forum is already added!"));
        }
        if (forum.getTitle().contains("'")) {
            forum.setTitle(forum.getTitle().replace("'", "''"));
        }
        logger.info("Insert from to database");
        jdbcTemplate.update("INSERT INTO FORUM (TITLE, DESCRIPTION, IMAGE) VALUES ('" + forum.getTitle() + "', '" + forum.getDescription() + "', 'https://i.ytimg.com/vi/" + convert(forum.getVideo()) + "/maxresdefault.jpg')");
        jdbcTemplate.update("INSERT INTO FORUMDETAIL (ITITLE, VIDEO, CONTENT, DPOSTID) VALUES ('" + forum.getTitle() + "', '" + forum.getVideo() + "', '" + forum.getContent() + "', '0')");
        jdbcTemplate.update("UPDATE FORUMDETAIL SET DPOSTID = (SELECT POSTID FROM FORUM WHERE forum.title = '" + forum.getTitle() + "') WHERE ITITLE = '" + forum.getTitle() + "'");
        logger.info("Sending mail....");
        sendMail("<h1>NEW POST!!!</h1>\n" +
                "<h3>" + forum.getTitle() + " is now on our Forum Page!!!</h3>\n" +
                "<h4>View now: http://14.225.7.151:5000/forum/</h4>\n" +
                "<img src=\"https://i.ytimg.com/vi/" + convert(forum.getVideo()) + "/maxresdefault.jpg\"/>");
        return new ResponseEntity<>(new MessageResponse("Forum added successfully!"), HttpStatus.CREATED);
    }

    @PutMapping("/forum")
    public ResponseEntity<?> updateForum(@RequestBody Forum forum) {
        logger.info("Update forum: " + forum.getPostid());
        jdbcTemplate.update("UPDATE FORUM SET TITLE = '" + forum.getTitle() + "', DESCRIPTION = '" + forum.getDescription() + "', IMAGE = 'https://i.ytimg.com/vi/" + convert(forum.getVideo()) + "/maxresdefault.jpg' WHERE POSTID = '" + forum.getPostid() + "'");
        jdbcTemplate.update("UPDATE FORUMDETAIL SET ITITLE = '" + forum.getTitle() + "', VIDEO = '" + forum.getVideo() + "', CONTENT = '" + forum.getContent() + "' WHERE DPOSTID = '" + forum.getPostid() + "'");
        return new ResponseEntity<>(new MessageResponse("Forum update successfully!"), HttpStatus.CREATED);
    }

    @DeleteMapping("/forum/{id}")
    public ResponseEntity<?> deleteForum(@PathVariable(value = "id") int id) {
        logger.info("Delete forum id: " + id);
        jdbcTemplate.update("DELETE FROM FORUM WHERE POSTID = " + id + "");
        jdbcTemplate.update("DELETE FROM FORUMDETAIL WHERE DPOSTID = " + id + "");
        return new ResponseEntity<>(new MessageResponse("Forum deleted successfully!"), HttpStatus.OK);
    }

    @GetMapping("/forum/search/{value}")
    public Page<Forum> searchProdName(@PathVariable(value = "value") String value, Pageable pageable) {
        logger.info("Search value: " + value);
        return this.forumRepository.searchForum(value.toLowerCase(Locale.ROOT), pageable);
    }

    @GetMapping("/forum/count")
    public ResponseEntity<?> countForum() {
        int num = this.forumRepository.countNumofForum();
        return new ResponseEntity<>(new CountResponse(num), HttpStatus.OK);
    }

    public void sendMail(String notice) throws ClassNotFoundException, SQLException {
        String to;
        String from = "bmtraining@gmail.com";
        String host = "smtp.gmail.com";
        Properties properties = System.getProperties();

        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("bmtraining.service@gmail.com", "Minhminh9!@#");
            }
        });

        session.setDebug(true);
        Connection conn;
        Class.forName("oracle.jdbc.OracleDriver");
        try {
            logger.info("Connecting to Oracle Database...");
            conn = DriverManager.getConnection("jdbc:oracle:thin:@14.225.7.153:31521/EE.oracle.docker", "bmtraining", "bmtraining");
            logger.info("Connected to Oracle Database");
        } catch (Exception err) {
            logger.error("Failed to connect to Oracle Database - jdbc:oracle:thin:@14.225.7.153:31521/EE.oracle.docker");
            err.printStackTrace();
            conn = null;
        }

        CallableStatement stmtDeviceBySQL = null;
        try {
            String query = "SELECT EMAIL FROM USERS";
            stmtDeviceBySQL = conn.prepareCall(query);
            ResultSet rs = stmtDeviceBySQL.executeQuery(query);
            while (rs.next()) {
                to = rs.getString("EMAIL");
                try {
                    MimeMessage message = new MimeMessage(session);
                    message.setFrom(new InternetAddress(from));
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
                    message.setSubject("New Forum!!!!!");
                    message.setContent(notice, "text/html");
                    logger.info("sending...");
                    Transport.send(message);
                    logger.info("Sent message successfully....");
                } catch (MessagingException mex) {
                    logger.error(mex.toString());
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            logger.error(e.toString());
        } finally {
            if (stmtDeviceBySQL != null) {
                stmtDeviceBySQL.close();
            }
        }
    }

    public String convert(String link) {
        String video_id = link.split("v=")[1];
        int tempLink = video_id.indexOf("&");
        if (tempLink != -1) {
            video_id = video_id.substring(0, tempLink);
        }
        return video_id;
    }
}
