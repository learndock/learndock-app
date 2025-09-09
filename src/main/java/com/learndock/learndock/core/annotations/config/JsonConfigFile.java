package com.learndock.learndock.core.annotations.config;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to mark a class as a JSON config file. The {@code value} defines the name/location of the config file.
 *
 * <p>A field annotated with {@code @DataConfigContent} of type {@code Object} receives the
 * actual content of the JSON file. The content is automatically deserialized into the field's type.</p>
 *
 * <p>Example usage:</p>
 * <pre>{@code
 * @JsonConfigFile("variables/system.json")
 * public class SystemVariablesConfig {
 *
 *     @DataConfigContent
 *     public static Object SYSTEM_VARIABLES;
 *
 * }
 * }</pre>
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@RegisteredConfigFile
public @interface JsonConfigFile {
    String value();

    String description() default "";
}