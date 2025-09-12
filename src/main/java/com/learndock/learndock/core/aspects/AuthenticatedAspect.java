package com.learndock.learndock.core.aspects;

import com.learndock.learndock.core.annotations.Authenticated;
import com.learndock.learndock.core.exceptions.APIAccessDeniedException;
import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.service.auth.AuthHeaderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Objects;
import java.util.Optional;

@Aspect
@Component
@RequiredArgsConstructor
public class AuthenticatedAspect {

    private final AuthHeaderService authHeaderService;

    /**
     * Check if the user is authenticated to access the resource.
     * If the user is not authenticated, an {@code APIAccessDeniedException} will be thrown.
     * This method will be called before the method annotated with {@code @Authenticated}.
     *
     * @see Authenticated
     */
    @Around("@annotation(com.learndock.learndock.core.annotations.Authenticated)")
    public Object checkAuthorization(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();

        Optional<User> userOpt = authHeaderService.extractUser(request);
        if (userOpt.isEmpty()) {
            throw new APIAccessDeniedException("You have to be logged in to access this resource.");
        }

        User user = userOpt.get();
        Object[] args = joinPoint.getArgs();
        for (int i = 0; i < args.length; i++) {
            if (args[i] instanceof User) {
                args[i] = user;
                break;
            }
        }

        return joinPoint.proceed(args);
    }
}