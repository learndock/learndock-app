package com.learndock.learndock.service.auth;

import com.learndock.learndock.core.security.jwt.JwtUtil;
import com.learndock.learndock.domain.models.auth.RefreshToken;
import com.learndock.learndock.domain.repositories.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtil jwtUtil;

    public RefreshToken createRefreshToken(String username) {
        String token = jwtUtil.generateRefreshToken(username);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(token);
        refreshToken.setUsername(username);
        refreshToken.setExpiryDate(Instant.now().plusMillis(jwtUtil.getRefreshTokenExpiry()));

        return refreshTokenRepository.save(refreshToken);
    }

    public boolean validateRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .filter(rt -> !rt.isExpired())
                .isPresent();
    }

    public String getUsernameFromRefreshToken(String token) {
        return jwtUtil.extractUsername(token);
    }

    public void deleteRefreshToken(String token) {
        refreshTokenRepository.deleteById(token);
    }

    public void deleteTokensForUser(String username) {
        refreshTokenRepository.deleteByUsername(username);
    }
}
