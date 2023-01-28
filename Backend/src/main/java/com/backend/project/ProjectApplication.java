/**
 * Written by minhhq
 */

package com.backend.project;

import org.apache.log4j.PropertyConfigurator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

import org.apache.log4j.Logger;

@SpringBootApplication
public class ProjectApplication {

    private static Logger logger = Logger.getLogger(ProjectApplication.class);

    public static void main(String[] args) {
        String log4jConfigFile = System.getProperty("user.dir")
                + File.separator + "src/main/resources/log4j.properties";
        PropertyConfigurator.configure(log4jConfigFile);
        SpringApplication.run(ProjectApplication.class, args);
        logger.info("Application run on port 1999....");
    }
}
