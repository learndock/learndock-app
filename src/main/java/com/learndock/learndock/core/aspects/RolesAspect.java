package com.learndock.learndock.core.aspects;

import com.learndock.learndock.core.annotations.Roles;
import com.learndock.learndock.core.exceptions.APIAccessDeniedException;
import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.service.users.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

@Aspect
@Component
@RequiredArgsConstructor
public class RolesAspect {

    private final UserService userInfoService;

    @Before("@annotation(roles)")
    public void checkRoles(JoinPoint joinPoint, Roles roles) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        Optional<User> userOpt = userInfoService.getUserByAuthHeader(authHeader);
        if (userOpt.isEmpty()) {
            throw new APIAccessDeniedException("You have to be logged in to access this resource.");
        }

        User user = userOpt.get();

        for (UserRole requiredRole : roles.value()) {
            if (user.hasRole(requiredRole)) {
                return;
            }
        }

        throw new APIAccessDeniedException("User does not have one of the allowed roles: " + Arrays.toString(roles.value()));
    }
}