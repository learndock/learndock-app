package com.learndock.learndock.core.annotations.config;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Specifies the default configuration file path for a data configuration class (e.g., TXT, JSON).
 * <p>
 * This annotation defines the relative location of the default config file that should be used
 * when no user-defined or external configuration is provided.
 * The specified file must be placed under the {@code /resources/config/} directory in the project's resources.
 * </p>
 * <p>
 * The {@link #value()} attribute should contain the file name or path relative to the {@code /resources/config/} directory.
 * For example: {@code "example-config.json"} or {@code "defaults/example.txt"}.
 * </p>
 * <p>
 * This annotation is typically used in combination with configuration management tools to preload
 * default settings during application startup or initialization.
 * </p>
 *
 * @see JsonConfigFile
 * @see TextConfigFile
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface DefaultConfigFile {
    /**
     * The relative path of the default configuration file within {@code /resources/config/}.
     *
     * @return the file name or path of the default config file
     */
    String value();
}

