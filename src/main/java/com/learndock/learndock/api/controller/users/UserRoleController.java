package com.learndock.learndock.api.controller.users;

import com.learndock.learndock.api.dto.users.ChangeRoleRequest;
import com.learndock.learndock.core.annotations.Authenticated;
import com.learndock.learndock.core.annotations.Roles;
import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.service.users.UserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/users/roles")
@RequiredArgsConstructor
public class UserRoleController {

    private final UserRoleService userRoleService;

    @Roles(UserRole.MANAGE_USERS)
    @PostMapping("/add")
    public void addRole(@RequestBody ChangeRoleRequest roleRequest) {
        userRoleService.addRole(roleRequest.getUsername(), roleRequest.getRole());
    }

    @Roles(UserRole.MANAGE_USERS)
    @PostMapping("/remove")
    public void removeRole(@RequestBody ChangeRoleRequest roleRequest) {
        userRoleService.removeRole(roleRequest.getUsername(), roleRequest.getRole());
    }

    @Authenticated
    @GetMapping
    public Set<UserRole> getRoles(User user) {
        return userRoleService.getRoles(user.getUsername());
    }
}