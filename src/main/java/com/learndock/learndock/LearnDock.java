package com.learndock.learndock;

import com.learndock.learndock.core.configurations.ConfigManager;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDate;
import java.util.Map;

import static com.learndock.learndock.config.ServerUserConfig.WEBSERVER_PORT;


@SpringBootApplication
@EnableAspectJAutoProxy
@EnableScheduling
public class LearnDock {
    public static final Logger MAIN_LOGGER = LoggerFactory.getLogger(LearnDock.class);

    @Autowired
    ApplicationContext context;

    public static void main(String[] args) {
        String today = LocalDate.now().toString();

        System.setProperty("logging.file.name", "./logs/" + today + ".log");

        SpringApplication app = new SpringApplication(LearnDock.class);
        ConfigManager.loadAllConfigs();

        int webServerPort = WEBSERVER_PORT.get();
        app.setDefaultProperties(Map.of(
                "server.port", webServerPort
        ));

        app.run(args);
    }

    @PostConstruct
    public void finishConstruction() {
        MAIN_LOGGER.info("LearnDock server bound to all interfaces on port {}", WEBSERVER_PORT.get());
    }

}
