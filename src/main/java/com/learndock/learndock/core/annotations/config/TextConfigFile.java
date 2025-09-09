package com.learndock.learndock.core.annotations.config;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to mark a class as representing a raw TXT configuration file. The {@code value} specifies
 * the file's name and location.
 *
 * <p>A field annotated with {@code @DataConfigContent} and of type {@code String} will receive the full
 * contents of the TXT file. The file is read as-is and stored directly in the field without any processing.</p>
 *
 * <p>Example usage:</p>
 * <pre>{@code
 * @TextConfigFile("descriptions/company.txt")
 * public class CompanyDescriptionConfig {
 *
 *     @DataConfigContent
 *     public static String COMPANY_DESCRIPTION;
 * }
 * }</pre>
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@RegisteredConfigFile
public @interface TextConfigFile {
    String value();

    String description() default "";
}