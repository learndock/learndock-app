package com.learndock.learndock.domain.repositories;

import com.learndock.learndock.domain.models.auth.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);

    void deleteByUsername(String username);
}
