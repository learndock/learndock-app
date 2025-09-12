package com.learndock.learndock.config;

import com.learndock.learndock.core.annotations.config.ConfigFile;
import com.learndock.learndock.core.annotations.config.ConfigProperty;
import com.learndock.learndock.core.configurations.ConfigEntry;

import java.security.SecureRandom;
import java.util.Base64;

@ConfigFile("server.properties")
public class ServerUserConfig {

    @ConfigProperty("webserver.port")
    public static ConfigEntry<Integer> WEBSERVER_PORT =
            new ConfigEntry<>(
                    Integer.class,
                    7777,
                    "The port the webserver should be served on");

    @ConfigProperty("security.secret_key")
    public static ConfigEntry<String> SECRET_KEY =
            new ConfigEntry<>(
                    String.class,
                    generateSecretKey(),
                    "Secret key to encode JWT tokens. Keep this secure and do not share it with anyone.");

    private static String generateSecretKey() {
        int length = 64;
        int byteLength = (int) Math.ceil(length * 3.0 / 4.0);
        byte[] bytes = new byte[byteLength];
        new SecureRandom().nextBytes(bytes);
        String base64 = Base64.getEncoder().encodeToString(bytes);
        return base64.length() >= length ? base64.substring(0, length)
                : String.format("%-" + length + "s", base64).replace(' ', 'A');
    }
}
