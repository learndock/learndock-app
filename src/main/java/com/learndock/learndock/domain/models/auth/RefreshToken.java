package com.learndock.learndock.domain.models.auth;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.Instant;

@Entity
@Table(name = "refresh_tokens")
@Data
public class RefreshToken {
    @Id
    private String token;
    private String username;
    private Instant expiryDate;

    public boolean isExpired() {
        return expiryDate.isBefore(Instant.now());
    }
}
