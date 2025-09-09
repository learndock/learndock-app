package com.learndock.learndock.config;

import com.learndock.learndock.core.annotations.config.ConfigFile;
import com.learndock.learndock.core.annotations.config.ConfigProperty;
import com.learndock.learndock.core.configurations.ConfigEntry;

@ConfigFile("logging.properties")
public class LoggingUserConfig {

    @ConfigProperty("logging.themes.cache.changes")
    public static ConfigEntry<Boolean> LOG_THEME_CACHE_CHANGES =
            new ConfigEntry<>(
                    Boolean.class,
                    false,
                    "Whether to log changes to the theme cache.");


}
