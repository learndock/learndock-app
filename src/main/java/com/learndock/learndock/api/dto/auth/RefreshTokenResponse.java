package com.learndock.learndock.api.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenResponse {
    private boolean success;
    private String accessToken;
    private String message;
}