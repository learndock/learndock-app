package com.learndock.learndock.api.dto.auth;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
