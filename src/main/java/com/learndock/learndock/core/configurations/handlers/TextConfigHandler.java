package com.learndock.learndock.core.configurations.handlers;

import com.learndock.learndock.core.annotations.config.DataConfigContent;
import com.learndock.learndock.core.annotations.config.TextConfigFile;

import java.io.File;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import static com.learndock.learndock.LearnDock.MAIN_LOGGER;

public class TextConfigHandler extends AbstractConfigHandler {
    @Override
    public void loadConfig(Class<?> configClass) {
        TextConfigFile annotation = configClass.getAnnotation(TextConfigFile.class);
        if (annotation == null) return;

        String fileName = annotation.value();
        File file = ensureFileExists(new File(CONFIG_DIR, fileName), getDefaultFile(configClass));

        try {
            String content = Files.readString(file.toPath(), StandardCharsets.UTF_8);
            for (Field field : configClass.getDeclaredFields()) {
                if (field.isAnnotationPresent(DataConfigContent.class)) {
                    field.setAccessible(true);
                    field.set(null, content);
                }
            }
        } catch (Exception e) {
            MAIN_LOGGER.error("Failed to read text config '{}': {}", fileName, e.getMessage());
        }
    }

    @Override
    public String getFileExtension() {
        return "txt";
    }
}
