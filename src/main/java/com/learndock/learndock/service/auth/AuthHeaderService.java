package com.learndock.learndock.service.auth;

import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.service.users.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthHeaderService {

    private final UserService userInfoService;

    public Optional<User> extractUser(HttpServletRequest servletRequest) {
        String authHeader = servletRequest.getHeader(HttpHeaders.AUTHORIZATION);

        return userInfoService.getUserByAuthHeader(authHeader);
    }

    public Optional<User> extractUserFromAccessToken(String accessToken) {
        return userInfoService.getUserByAccessToken(accessToken);
    }
}
