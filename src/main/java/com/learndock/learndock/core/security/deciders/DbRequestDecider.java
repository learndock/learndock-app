package com.learndock.learndock.core.security.deciders;

import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.service.auth.AuthHeaderService;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;
import java.util.function.Supplier;

@RequiredArgsConstructor
@Component
public class DbRequestDecider implements AuthorizationManager<RequestAuthorizationContext> {

    private static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    private final AuthHeaderService authHeaderService;

    @Override
    public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext context) {
        // Safely stream cookies (handles null)
        Optional<String> accessToken = Optional.ofNullable(context.getRequest().getCookies()).stream().flatMap(Arrays::stream)
                .filter(c -> ACCESS_TOKEN_COOKIE_NAME.equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst();

        if (accessToken.isEmpty()) {
            return new AuthorizationDecision(false);
        }

        Optional<User> userOpt = authHeaderService.extractUserFromAccessToken(accessToken.get());

        return new AuthorizationDecision(userOpt.isPresent() && userOpt.get().hasRole(UserRole.DB_ADMIN));
    }
}
