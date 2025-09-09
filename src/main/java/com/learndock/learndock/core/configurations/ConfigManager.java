package com.learndock.learndock.core.configurations;

import com.learndock.learndock.LearnDock;
import com.learndock.learndock.core.annotations.config.ConfigFile;
import com.learndock.learndock.core.annotations.config.JsonConfigFile;
import com.learndock.learndock.core.annotations.config.RegisteredConfigFile;
import com.learndock.learndock.core.annotations.config.TextConfigFile;
import com.learndock.learndock.core.configurations.handlers.ConfigHandler;
import com.learndock.learndock.core.configurations.handlers.JsonConfigHandler;
import com.learndock.learndock.core.configurations.handlers.PropertiesConfigHandler;
import com.learndock.learndock.core.configurations.handlers.TextConfigHandler;
import io.github.classgraph.ClassGraph;
import io.github.classgraph.ClassInfo;
import io.github.classgraph.ScanResult;
import lombok.Getter;

import java.util.*;

public class ConfigManager {
    public static final String CONFIG_DIR = "config";

    private static final List<ConfigHandler> handlers = List.of(
            new PropertiesConfigHandler(),
            new JsonConfigHandler(),
            new TextConfigHandler()
    );

    @Getter
    private static final Map<String, Properties> loadedConfigs = new HashMap<>();

    public static void loadAllConfigs() {
        try (ScanResult scanResult = new ClassGraph().enableAnnotationInfo().scan()) {
            for (ClassInfo classInfo : scanResult.getClassesWithAnnotation(RegisteredConfigFile.class.getName())) {
                Class<?> clazz = Class.forName(classInfo.getName());
                loadConfigs(clazz);
            }
        } catch (Exception e) {
            LearnDock.MAIN_LOGGER.error("Failed to scan for config classes", e);
        }
    }

    public static void loadConfigs(Class<?>... configClasses) {
        for (Class<?> configClass : configClasses) {
            String extension;

            if (configClass.isAnnotationPresent(ConfigFile.class)) {
                extension = "properties";
            } else if (configClass.isAnnotationPresent(JsonConfigFile.class)) {
                extension = "json";
            } else if (configClass.isAnnotationPresent(TextConfigFile.class)) {
                extension = "txt";
            } else {
                continue;
            }

            Optional<ConfigHandler> handler = handlers.stream()
                    .filter(h -> h.getFileExtension().equalsIgnoreCase(extension))
                    .findFirst();

            if (handler.isPresent()) {
                handler.get().loadConfig(configClass);
            } else {
                LearnDock.MAIN_LOGGER.warn("No config handler registered for extension: {}", extension);
            }
        }
    }

}
