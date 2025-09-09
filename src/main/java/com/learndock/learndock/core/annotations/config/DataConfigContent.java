package com.learndock.learndock.core.annotations.config;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marks a field as containing the data content of a configuration file.
 * <p>
 * Fields annotated with {@code @DataConfigContent} are intended to hold the raw or processed contents
 * of a configuration resource, such as plain text or parsed JSON data.
 * </p>
 * <p>
 * <strong>Important:</strong> Using this annotation alone does not automatically load or populate
 * the field with configuration data. It must be used in conjunction with a class-level configuration annotation
 * such as {@link JsonConfigFile} or {@link TextConfigFile}, which handle the actual loading and binding of the configuration file.
 * </p>
 * <p>
 * This annotation is primarily used by the configuration processing system to identify which fields should receive
 * the configuration content during initialization.
 * </p>
 *
 * @see JsonConfigFile
 * @see TextConfigFile
 * @see RegisteredConfigFile
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface DataConfigContent {
}
