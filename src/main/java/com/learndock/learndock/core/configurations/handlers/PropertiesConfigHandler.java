package com.learndock.learndock.core.configurations.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learndock.learndock.core.annotations.config.ConfigFile;
import com.learndock.learndock.core.annotations.config.ConfigProperty;
import com.learndock.learndock.core.configurations.ConfigEntry;
import com.learndock.learndock.core.configurations.ConfigEntryWithAccess;
import com.learndock.learndock.core.configurations.ConfigManager;

import java.io.File;
import java.io.FileWriter;
import java.lang.reflect.Field;
import java.util.Objects;
import java.util.Properties;

import static com.learndock.learndock.LearnDock.MAIN_LOGGER;

public class PropertiesConfigHandler extends AbstractConfigHandler {

    @Override
    public void loadConfig(Class<?> configClass) {
        ConfigFile annotation = configClass.getAnnotation(ConfigFile.class);
        if (annotation == null) return;

        String configFile = annotation.value();
        File file = new File(CONFIG_DIR, configFile);
        Properties properties = new Properties();

        ensureFileExists(file, null);
        try (var input = new java.io.FileInputStream(file)) {
            properties.load(input);
        } catch (Exception e) {
            MAIN_LOGGER.error("Failed to load properties file: {}", file.getPath(), e);
            return;
        }

        for (Field field : configClass.getDeclaredFields()) {
            if (!field.isAnnotationPresent(ConfigProperty.class)) continue;

            ConfigProperty prop = field.getAnnotation(ConfigProperty.class);
            String key = prop.value();

            try {
                field.setAccessible(true);
                Object entryObject = field.get(null);
                if (entryObject instanceof ConfigEntry<?> entry) {
                    String rawValue = properties.getProperty(key);
                    Object parsed = ConfigEntry.parseValue(rawValue, entry.getType(), entry.getDefaultValue());

                    if (rawValue == null) {
                        MAIN_LOGGER.warn("Missing config '{}'. Writing default: {}", key, entry.getDefaultValue());
                        saveProperty(file, key, entry.getDescription(), entry.getDefaultValue());
                    } else if (!Objects.equals(rawValue, String.valueOf(parsed))) {
                        MAIN_LOGGER.warn("Incorrect format for '{}'. Using default: {}", key, entry.getDefaultValue());
                    }

                    @SuppressWarnings("unchecked")
                    ConfigEntry<Object> typedEntry = (ConfigEntry<Object>) entry;

                    field.set(null, new ConfigEntryWithAccess<>(
                            typedEntry.getType(),
                            typedEntry.getDefaultValue(),
                            typedEntry.getDescription(),
                            key,
                            configFile
                    ));
                }
            } catch (IllegalAccessException e) {
                MAIN_LOGGER.error("Failed to assign property field: {}", field.getName(), e);
            }
        }

        ConfigManager.getLoadedConfigs().put(configFile, properties);
    }

    private void saveProperty(File file, String key, String description, Object defaultValue) {
        try (FileWriter writer = new FileWriter(file, true)) {
            for (String line : description.split("\n")) {
                writer.write("# " + line + "\n");
            }
            String value = (defaultValue instanceof String)
                    ? (String) defaultValue
                    : new ObjectMapper().writeValueAsString(defaultValue);
            writer.write(key + "=" + value + "\n\n");
        } catch (Exception e) {
            MAIN_LOGGER.error("Failed to save property '{}': {}", key, e.getMessage());
        }
    }

    @Override
    public String getFileExtension() {
        return "properties";
    }
}
