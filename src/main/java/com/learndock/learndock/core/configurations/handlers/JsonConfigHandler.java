package com.learndock.learndock.core.configurations.handlers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learndock.learndock.core.annotations.config.DataConfigContent;
import com.learndock.learndock.core.annotations.config.JsonConfigFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class JsonConfigHandler extends AbstractConfigHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(JsonConfigHandler.class);
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void loadConfig(Class<?> configClass) {
        String fileName = getConfigFileName(configClass);
        String defaultFileName = getDefaultFile(configClass);

        File file = ensureFileExists(new File(CONFIG_DIR, fileName), defaultFileName);

        Map<String, Object> config = readJsonFile(file);
        Optional<Map<String, Object>> defaultConfig = getDefaultConfig(configClass);

        defaultConfig.ifPresent(defaultMap -> {
            boolean changed = mergeMissingKeys(config, defaultMap);
            if (changed) {
                try {
                    mapper.writer().writeValue(file, config);
                    LOGGER.info("Updated config with missing keys: {}", file.getName());
                } catch (Exception e) {
                    LOGGER.error("Failed to write updated config file: {}", file.getName(), e);
                }
            }
            notifyAboutExtraKeys(config, defaultMap);
        });

        injectIntoStaticField(configClass, config);
    }

    @Override
    public String getFileExtension() {
        return "json";
    }

    private Map<String, Object> readJsonFile(File file) {
        try {
            return mapper.readValue(file, new TypeReference<>() {
            });
        } catch (Exception e) {
            LOGGER.error("Failed to read JSON config file: {}", file.getName(), e);
            return new HashMap<>();
        }
    }

    private Optional<Map<String, Object>> getDefaultConfig(Class<?> configClass) {
        String defaultFileName = getDefaultFile(configClass);
        if (defaultFileName == null || defaultFileName.isEmpty()) {
            return Optional.empty();
        }

        try {
            ClassPathResource resource = new ClassPathResource("config/" + defaultFileName);
            if (!resource.exists()) {
                LOGGER.warn("Default config resource not found: {}", defaultFileName);
                return Optional.empty();
            }

            try (InputStream in = resource.getInputStream()) {
                Map<String, Object> defaultMap = mapper.readValue(in, new TypeReference<>() {
                });
                return Optional.of(defaultMap);
            }
        } catch (Exception e) {
            LOGGER.error("Failed to read default JSON config: {}", defaultFileName, e);
            return Optional.empty();
        }
    }

    private boolean mergeMissingKeys(Map<String, Object> config, Map<String, Object> defaultConfig) {
        boolean changed = false;
        for (Map.Entry<String, Object> entry : defaultConfig.entrySet()) {
            if (!config.containsKey(entry.getKey())) {
                config.put(entry.getKey(), entry.getValue());
                changed = true;
                LOGGER.info("Added missing key '{}' to config", entry.getKey());
            }
        }
        return changed;
    }

    private void notifyAboutExtraKeys(Map<String, Object> config, Map<String, Object> defaultConfig) {
        for (String key : config.keySet()) {
            if (!defaultConfig.containsKey(key)) {
                LOGGER.warn("Config file contains unknown key '{}'. It may be unused.", key);
            }
        }
    }

    private String getConfigFileName(Class<?> configClass) {
        JsonConfigFile annotation = configClass.getAnnotation(JsonConfigFile.class);
        if (annotation == null) {
            throw new IllegalStateException("Config class missing @JsonConfigFile annotation: " + configClass.getName());
        }
        return annotation.value();
    }

    private void injectIntoStaticField(Class<?> configClass, Object configObject) {
        for (var field : configClass.getDeclaredFields()) {
            if (field.isAnnotationPresent(DataConfigContent.class)) {
                if (!java.lang.reflect.Modifier.isStatic(field.getModifiers())) {
                    LOGGER.error("@DataConfigContent field must be static: {}", field.getName());
                    continue;
                }
                try {
                    field.setAccessible(true);
                    field.set(null, configObject);
                } catch (Exception e) {
                    LOGGER.error("Failed to inject config into field {}.{}", configClass.getSimpleName(), field.getName(), e);
                }
            }
        }
    }
}
