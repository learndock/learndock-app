package com.learndock.learndock.service.language;

import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import static com.learndock.learndock.service.language.LanguageConfig.CUSTOM_LANG_DIR_PATH;

@Getter
@Component
public class LanguageKeyRegistry {

    private static final Logger LOGGER = LoggerFactory.getLogger(LanguageKeyRegistry.class);
    private static final String BASE_KEYS_FILE = "/i18n/keys.properties";

    private final List<String> knownKeys;

    public LanguageKeyRegistry() {
        this.knownKeys = loadKeysWithFallback();
    }

    private List<String> loadKeysWithFallback() {
        File customLangDir = new File(CUSTOM_LANG_DIR_PATH);
        if (!customLangDir.exists()) {
            if (customLangDir.mkdirs()) {
                LOGGER.info("Created missing directory: {}", customLangDir.getPath());
            } else {
                LOGGER.warn("Failed to create language directory at: {}", customLangDir.getAbsolutePath());
            }
        }

        Properties properties = new Properties();

        try (InputStream input = getClass().getResourceAsStream(BASE_KEYS_FILE)) {
            if (input == null) {
                LOGGER.warn("Language key file not found at '{}'. No translation keys will be registered.", BASE_KEYS_FILE);
                return Collections.emptyList();
            }

            properties.load(input);
            return new ArrayList<>(properties.stringPropertyNames());
        } catch (Exception e) {
            LOGGER.error("Failed to load language key file '{}': {}", BASE_KEYS_FILE, e.getMessage(), e);
            return Collections.emptyList();
        }
    }

}
