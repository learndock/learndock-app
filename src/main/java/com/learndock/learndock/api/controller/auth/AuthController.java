package com.learndock.learndock.api.controller.auth;


import com.learndock.learndock.api.dto.auth.AuthRequest;
import com.learndock.learndock.api.dto.auth.AuthResponse;
import com.learndock.learndock.api.dto.auth.RefreshTokenResponse;
import com.learndock.learndock.api.dto.auth.RegisterRequest;
import com.learndock.learndock.core.security.jwt.JwtUtil;
import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.service.auth.AuthService;
import com.learndock.learndock.service.auth.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {
        Optional<User> user = authService.registerUser(request.getUsername(), request.getPassword());
        return user
                .map(value -> ResponseEntity.status(HttpStatus.CREATED).build())
                .orElseGet(() -> ResponseEntity.status(HttpStatus.CONFLICT).build()); // 409: Conflict
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401
        }

        String accessToken = jwtUtil.generateToken(request.getUsername());
        String refreshToken = refreshTokenService.createRefreshToken(request.getUsername()).getToken();

        response.addHeader("Set-Cookie", authService.getRefreshCookie(refreshToken, jwtUtil.getRefreshTokenExpiry()).toString());

        return ResponseEntity.ok(new AuthResponse(accessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        var expiredCookie = authService.getRefreshCookie("", 0);
        response.addHeader("Set-Cookie", expiredCookie.toString());

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refresh(HttpServletRequest request) {
        String refreshToken = jwtUtil.extractTokenFromCookie(request, "refresh_token");

        if (refreshToken == null || !refreshTokenService.validateRefreshToken(refreshToken)) {
            return ResponseEntity.ok(new RefreshTokenResponse(false, null, "Refresh token invalid or expired."));
        }

        String username = refreshTokenService.getUsernameFromRefreshToken(refreshToken);
        String newAccessToken = jwtUtil.generateToken(username);

        return ResponseEntity.ok(new RefreshTokenResponse(true, newAccessToken, "Token refreshed successfully."));
    }

    @GetMapping("/isAuthenticated")
    public ResponseEntity<Boolean> isAuthenticated(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.ok(false);
        }

        String token = authHeader.substring(7);
        return ResponseEntity.ok(jwtUtil.validateToken(token));
    }
}
