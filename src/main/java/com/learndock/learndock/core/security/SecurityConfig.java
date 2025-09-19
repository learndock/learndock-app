package com.learndock.learndock.core.security;

import com.learndock.learndock.core.security.deciders.DbRequestDecider;
import com.learndock.learndock.core.security.jwt.JwtAuthenticationFilter;
import com.learndock.learndock.core.security.jwt.JwtUtil;
import com.learndock.learndock.service.auth.AuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security configuration class.
 * Sets up JWT-based stateless authentication and exposes necessary security beans.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public static final long ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000; // 15 minutes
    public static final long REFRESH_TOKEN_EXPIRY = 30L * 24 * 60 * 60 * 1000; // 30 days

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    /**
     * Constructs a new {@code SecurityConfig}.
     *
     * @param authService the authentication service
     * @param jwtUtil     the utility for handling JWT operations
     */
    public SecurityConfig(@Lazy AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Configures the HTTP security filter chain.
     *
     * @param http the {@link HttpSecurity} to configure
     * @return the configured {@link SecurityFilterChain}
     * @throws Exception in case of configuration errors
     */
    @Bean
    public SecurityFilterChain securityFilterChain(@NonNull HttpSecurity http, DbRequestDecider dbRequestDecider) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(AbstractHttpConfigurer::disable)
                .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/h2-console/**").access(dbRequestDecider)
                        .anyRequest().permitAll()
                )
                .exceptionHandling(
                        exception -> exception
                                .authenticationEntryPoint(new LoginEntryPoint())
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)) // allow H2 frames
                .build();
    }


    /**
     * Provides the {@link AuthenticationManager} with a custom {@link DaoAuthenticationProvider}.
     *
     * @return the authentication manager
     */
    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(authService);
        provider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(provider);
    }

    /**
     * Provides a password encoder bean using BCrypt.
     *
     * @return the password encoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
