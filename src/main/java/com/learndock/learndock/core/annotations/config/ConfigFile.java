package com.learndock.learndock.core.annotations.config;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marks a class as representing a properties-based configuration file for the user.
 * <p>
 * This annotation is the primary and recommended way to define configuration files
 * consisting of key-value property pairs (typically {@code .properties} files).
 * </p>
 * <p>
 * Classes annotated with {@code @ConfigFile} should declare {@code static} fields representing
 * individual configuration entries, typically using {@code ConfigEntry}.
 * Each field should also be annotated with {@link ConfigProperty} to specify the corresponding property key.
 * </p>
 * <p>
 * The {@link #value()} parameter defines the name or relative path of the properties file
 * located in the {@code /config/} working directory.
 * </p>
 * <p>
 * <strong>Note:</strong> This annotation integrates with the configuration system to automatically
 * load, populate, and manage configuration properties at runtime.
 * </p>
 *
 * <h3>Example Usage:</h3>
 * <pre>{@code
 * @ConfigFile("server.properties")
 * public class ServerUserConfig {
 *
 *     @ConfigProperty("webserver.port")
 *     public static ConfigEntry<Integer> WEBSERVER_PORT =
 *             new ConfigEntry<>(
 *                     Integer.class,
 *                     8080,
 *                     "The port the webserver should be served on");
 * }
 * }</pre>
 *
 * @see ConfigProperty
 * @see RegisteredConfigFile
 * @see DefaultConfigFile
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@RegisteredConfigFile
public @interface ConfigFile {
    /**
     * The name or relative path of the configuration file within {@code /resources/config/}.
     *
     * @return the path to the properties configuration file
     */
    String value();
}
