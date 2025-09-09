package com.learndock.learndock.core.annotations.config;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Specifies the property key for a configuration field inside a {@link ConfigFile} class.
 * <p>
 * This annotation is used to map a field to its corresponding key in the properties file
 * defined by the enclosing {@link ConfigFile}.
 * </p>
 * <p>
 * Fields annotated with {@code @ConfigProperty} are typically declared as {@code static}
 * and hold configuration entries of type {@code ConfigEntry}.
 * </p>
 *
 * @see ConfigFile
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@SuppressWarnings("CanBeFinal")
public @interface ConfigProperty {
    /**
     * The property key in the configuration file.
     *
     * @return the configuration property key
     */
    String value();
}
