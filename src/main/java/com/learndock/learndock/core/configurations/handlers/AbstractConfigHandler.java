package com.learndock.learndock.core.configurations.handlers;

import com.learndock.learndock.core.annotations.config.DefaultConfigFile;
import com.learndock.learndock.core.configurations.ConfigManager;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

import static com.learndock.learndock.LearnDock.MAIN_LOGGER;

public abstract class AbstractConfigHandler implements ConfigHandler {
    protected static final String CONFIG_DIR = ConfigManager.CONFIG_DIR;

    protected File ensureFileExists(File file, String defaultFilePath) {
        if (file.exists()) return file;

        File parent = file.getParentFile();
        if (parent != null && !parent.exists() && !parent.mkdirs()) {
            MAIN_LOGGER.error("Failed to create directories for: {}", parent.getPath());
            return file;
        }

        try {
            if (defaultFilePath != null && !defaultFilePath.isEmpty()) {
                ClassPathResource resource = new ClassPathResource("config/" + defaultFilePath);
                if (resource.exists()) {
                    try (InputStream in = resource.getInputStream()) {
                        Files.copy(in, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
                        return file;
                    }
                }
            }

            if (!file.createNewFile()) {
                MAIN_LOGGER.error("Failed to create file: {}", file.getPath());
            }
        } catch (Exception e) {
            MAIN_LOGGER.error("Exception while creating file: {}", file.getPath(), e);
        }

        return file;
    }

    protected String getDefaultFile(Class<?> configClass) {
        var defaultFileAnnotation = configClass.getAnnotation(DefaultConfigFile.class);
        return defaultFileAnnotation != null ? defaultFileAnnotation.value() : "";
    }
}
