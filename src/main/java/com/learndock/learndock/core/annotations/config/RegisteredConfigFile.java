package com.learndock.learndock.core.annotations.config;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Indicates that a class represents a registered configuration file.
 * <p>
 * Classes annotated with this are recognized by the {@code ConfigManager} for configuration loading purposes.
 * However, note that using this annotation alone will not automatically load the configuration file.
 * </p>
 * <p>
 * It is recommended to use one of the provided implementation annotations, such as {@link JsonConfigFile}
 * or {@link TextConfigFile}, as they offer additional functionality and proper integration with the configuration system.
 * </p>
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface RegisteredConfigFile {
}
