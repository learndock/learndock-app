package com.learndock.learndock.service.auth;

import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> registerUser(String username, String password) {
        if (userService.exists(username)) {
            return Optional.empty();
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        return Optional.of(userService.save(user));
    }

    public ResponseCookie getRefreshCookie(String refreshToken, long expiryMs) {
        return ResponseCookie.from("refresh_token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/api/auth/refresh")
                .maxAge(Duration.ofMillis(expiryMs))
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService.getUser(username)
                .map(user -> org.springframework.security.core.userdetails.User
                        .withUsername(user.getUsername())
                        .password(user.getPassword()) //
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}
