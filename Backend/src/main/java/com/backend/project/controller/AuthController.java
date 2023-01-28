/**
 * Written by minhhq
 */

package com.backend.project.controller;

import com.backend.project.payload.request.ChangePasswordRequest;
import com.backend.project.payload.request.LoginRequest;
import com.backend.project.payload.request.SignupRequest;
import com.backend.project.payload.response.JwtResponse;
import com.backend.project.payload.response.MessageResponse;
import com.backend.project.repository.RoleRepository;
import com.backend.project.repository.UserRepository;
import com.backend.project.security.jwt.JwtUtils;
import com.backend.project.security.services.UserDetailsImpl;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static Logger logger = Logger.getLogger(AuthController.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("Login Request: " + loginRequest);
        logger.info("Username: " + loginRequest.getUsername());
        logger.info("Password: " + loginRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        logger.info("Login Request: Successfully");
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        logger.info("Change Password Request: " + changePasswordRequest);
        logger.info("Username: " + changePasswordRequest.getUsername());
        logger.info("Password: " + changePasswordRequest.getPassword());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(changePasswordRequest.getUsername(), changePasswordRequest.getPassword()));

            jdbcTemplate.update("UPDATE USERS SET PASSWORD = '" + encoder.encode(changePasswordRequest.getNewPassword()) + "' WHERE USERNAME = '" + changePasswordRequest.getUsername() + "'");

            logger.info("Password change: Successfully");
            return ResponseEntity.ok(new MessageResponse("Password change successfully!"));
        } catch (Exception e) {
            logger.error("Old Password is not correct!");
            return ResponseEntity.badRequest().body(new MessageResponse("Old Password is not correct!"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        logger.info("Signup Request: " + signUpRequest);
        logger.info("Email: " + signUpRequest.getEmail());
        logger.info("Username: " + signUpRequest.getUsername());
        logger.info("Password: " + signUpRequest.getPassword());
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            logger.error("Insert User information into database");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            logger.error("Insert User information into database");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        logger.info("Insert User information into database");
        jdbcTemplate.update("INSERT INTO USERS (EMAIL, PASSWORD, USERNAME)" + "VALUES ('" + signUpRequest.getEmail() + "', '" + encoder.encode(signUpRequest.getPassword()) + "', '" + signUpRequest.getUsername() + "')");

        logger.info("Signup Request: Successfully");
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
