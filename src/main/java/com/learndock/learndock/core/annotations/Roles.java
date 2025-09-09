package com.learndock.learndock.core.annotations;

import com.learndock.learndock.domain.models.users.UserRole;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Specifies the required user roles to access the annotated method.
 * <p>
 * Methods annotated with {@code @Roles} will only execute if the authenticated user
 * has at least one of the specified roles. Otherwise, access is denied.
 * </p>
 *
 * <h3>Example Usage:</h3>
 * <pre>{@code
 * @Roles(UserRole.ADMIN)
 * public void deleteUserAccount() {
 *     // Accessible only by ADMIN.
 * }
 * }</pre>
 *
 * @see UserRole
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Roles {
    /**
     * Defines the list of roles that are allowed to access the annotated method.
     *
     * @return array of allowed {@code UserRole}s
     */
    UserRole[] value();
}
