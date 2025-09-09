package com.learndock.learndock.core.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

import static com.learndock.learndock.config.ServerUserConfig.SECRET_KEY;
import static com.learndock.learndock.core.security.SecurityConfig.ACCESS_TOKEN_EXPIRY;
import static com.learndock.learndock.core.security.SecurityConfig.REFRESH_TOKEN_EXPIRY;

/**
 * Utility class for generating and validating JWT tokens.
 */
@Component
public class JwtUtil {

    /**
     * Generates a JWT access token for a given username.
     *
     * @param username the username to include in the token
     * @return a signed JWT access token
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRY))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Generates a JWT refresh token for a given username.
     *
     * @param username the username to include in the refresh token
     * @return a signed JWT refresh token
     */
    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRY))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the username from a JWT token.
     *
     * @param token the JWT token
     * @return the username (subject) stored in the token
     */
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    /**
     * Extracts a JWT token value from an HTTP request cookie.
     *
     * @param request    the HTTP request containing cookies
     * @param cookieName the name of the cookie containing the token
     * @return the token value if found, otherwise {@code null}
     */
    public String extractTokenFromCookie(HttpServletRequest request, String cookieName) {
        if (request.getCookies() == null) return null;

        for (Cookie cookie : request.getCookies()) {
            if (cookieName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    /**
     * Validates the JWT token by checking its expiration.
     *
     * @param token the JWT token to validate
     * @return {@code true} if the token is valid and not expired, otherwise {@code false}
     */
    public boolean validateToken(String token) {
        try {
            Claims claims = extractClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Returns the refresh token expiry duration in milliseconds.
     *
     * @return refresh token expiry duration
     */
    public long getRefreshTokenExpiry() {
        return REFRESH_TOKEN_EXPIRY;
    }

    /**
     * Extracts claims from the JWT token.
     *
     * @param token the JWT token
     * @return the claims contained in the token
     */
    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Returns the HMAC signing key used for signing and parsing JWTs.
     *
     * @return the signing key
     */
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.get().getBytes());
    }
}
