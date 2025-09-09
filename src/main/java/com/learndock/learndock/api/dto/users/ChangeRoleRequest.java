package com.learndock.learndock.api.dto.users;

import com.learndock.learndock.domain.models.users.UserRole;
import lombok.Data;

@Data
public class ChangeRoleRequest {
    private String username;
    private UserRole role;
}
