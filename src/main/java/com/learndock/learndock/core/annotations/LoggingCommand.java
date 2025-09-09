package com.learndock.learndock.core.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marks a method to be automatically logged when executed.
 * <p>
 * Methods annotated with {@code @LoggingCommand} will trigger a log entry containing
 * the method name each time they are called. This is useful for tracking command executions
 * or user-invoked actions.
 * </p>
 *
 * <h3>Example Usage:</h3>
 * <pre>{@code
 * @LoggingCommand
 * public void performBackup() {
 *     // Executes command and logs: "Executing command: performBackup"
 * }
 * }</pre>
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LoggingCommand {
}
