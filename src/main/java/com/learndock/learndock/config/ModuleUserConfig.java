package com.learndock.learndock.config;

import com.learndock.learndock.core.annotations.config.ConfigFile;
import com.learndock.learndock.core.annotations.config.ConfigProperty;
import com.learndock.learndock.core.configurations.ConfigEntry;

@ConfigFile("modules.properties")
public class ModuleUserConfig {

    @ConfigProperty("modules.log.load")
    public static ConfigEntry<Boolean> LOG_MODULE_LOADING =
            new ConfigEntry<>(
                    Boolean.class,
                    false,
                    "Whether to log module loading. This is useful for debugging purposes.");

    @ConfigProperty("modules.log.changes")
    public static ConfigEntry<Boolean> LOG_MODULE_CHANGES =
            new ConfigEntry<>(
                    Boolean.class,
                    false,
                    "Whether to log changes to modules (adding, changing, removing) while the server is running. This is useful for debugging purposes.");

    @ConfigProperty("modules.hot-reload")
    public static ConfigEntry<Boolean> RELOAD_SINGLE_MODULE =
            new ConfigEntry<>(
                    Boolean.class,
                    true,
                    "Whether to reload only the changed module when a module is changed. Otherwise all modules will be reloaded.");

}
