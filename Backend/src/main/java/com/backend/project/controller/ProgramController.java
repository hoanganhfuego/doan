/**
 * Written by minhhq
 */

package com.backend.project.controller;

import com.backend.project.model.BMITracker;
import com.backend.project.model.ListWorkout;
import com.backend.project.model.Program;
import com.backend.project.payload.response.MessageResponse;
import com.backend.project.repository.BMITrackerRepository;
import com.backend.project.repository.ListWorkoutRepository;
import com.backend.project.repository.ProgramRepository;
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
public class ProgramController {
    private static Logger logger = Logger.getLogger(ProgramController.class);

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ListWorkoutRepository listWorkoutRepository;

    @Autowired
    BMITrackerRepository bmiTrackerRepository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/program/muscle")
    public List<Program> getMuscle() {
        return programRepository.findMuscle();
    }

    @GetMapping("/program/target")
    public List<Program> getTarget() {
        return programRepository.findTarget();
    }

    @PostMapping("/program")
    public ResponseEntity<?> createProgram(@RequestBody ListWorkout listWorkout) {
        try {
            jdbcTemplate.update("INSERT INTO LISTWORKOUT (NAME, LABEL, VIDEO) VALUES ('" + listWorkout.getName() + "', '" + listWorkout.getLabel() + "', '" + listWorkout.getVideo() + "')");
            sendMail("<h1>NEW EXERCISE!!!</h1>\n" +
                    "<h3>" + listWorkout.getName() + " is in " + listWorkout.getLabel() + " now on our Training Page!!!</h3>\n" +
                    "<h4>View now: http://14.225.7.151:5000/list/" + listWorkout.getLabel().replace(" ", "%20") + "</h4>\n" +
                    "<img src=\"https://i.ytimg.com/vi/" + convert(listWorkout.getVideo()) + "/maxresdefault.jpg\"/>");
            return new ResponseEntity<>(new MessageResponse("Video added successfully!"), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse("Video added failed!"));
        }
    }

    @PutMapping("/program")
    public ResponseEntity<?> updateProgram(@RequestBody ListWorkout listWorkout) {
        try {
            jdbcTemplate.update("UPDATE LISTWORKOUT SET NAME = '" + listWorkout.getName() + "', LABEL = '" + listWorkout.getLabel() + "', VIDEO = '" + listWorkout.getVideo() + "' WHERE ID = '" + listWorkout.getId() + "' ");
            return new ResponseEntity<>(new MessageResponse("Video update successfully!"), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse("Video update failed!"));
        }
    }

    @GetMapping("/list/{label}")
    public List<ListWorkout> getListDueLabel(@PathVariable(value = "label") String label) {
        return listWorkoutRepository.findListDueLabel(label);
    }

    @GetMapping("/list/")
    public Page<ListWorkout> getList(Pageable pageable) {
        return listWorkoutRepository.findVideo(pageable);
    }

    @GetMapping("/list/search/{value}")
    public Page<ListWorkout> getSearchList(@PathVariable(value = "value") String value, Pageable pageable) {
        return listWorkoutRepository.searchVideo(value.toLowerCase(Locale.ROOT), pageable);
    }

    @GetMapping("/video/{name}")
    public List<ListWorkout> getvideoDueName(@PathVariable(value = "name") String name) {
        return listWorkoutRepository.findVideoDueName(name);
    }

    @DeleteMapping("/list/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable(value = "id") int id) {
        jdbcTemplate.update("DELETE FROM LISTWORKOUT WHERE ID = " + id + "");
        return new ResponseEntity<>(new MessageResponse("Video deleted successfully!"), HttpStatus.OK);
    }

    @PostMapping("/bmi")
    public ResponseEntity<?> createBMIValue(@RequestBody BMITracker bmiTracker) {
        jdbcTemplate.update("call VALIDATIONBMITRACKER('" + bmiTracker.getUsername() + "', " + bmiTracker.getBmi() + ")");
        return new ResponseEntity<>(new MessageResponse("BMI added successfully!"), HttpStatus.CREATED);
    }

    @GetMapping("/bmi/{label}")
    public List<Program> getBMI(@PathVariable(value = "label") String label) {
        return this.programRepository.BMI(label);
    }

    @GetMapping("/chart/{username}")
    public List<BMITracker> getBMITracker(@PathVariable(value = "username") String username) {
        return this.bmiTrackerRepository.findBMI(username);
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
                    System.out.println("sending...");
                    Transport.send(message);
                    System.out.println("Sent message successfully....");
                } catch (MessagingException mex) {

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

    public String convert(String link){
        String video_id = link.split("v=")[1];
        int tempLink = video_id.indexOf("&");
        if (tempLink != -1) {
            video_id = video_id.substring(0, tempLink);
        }
        return video_id;
    }
}
