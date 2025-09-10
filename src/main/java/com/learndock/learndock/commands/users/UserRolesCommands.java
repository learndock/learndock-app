package com.learndock.learndock.commands.users;

import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.domain.repositories.UserRepository;
import com.learndock.learndock.service.users.UserRoleService;
import lombok.AllArgsConstructor;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;

import java.util.Optional;

@ShellComponent
@AllArgsConstructor
public class UserRolesCommands {

    private final UserRoleService userRoleService;
    private final UserRepository userRepository;

    @ShellMethod("Add a role to a user")
    public String addRole(String username, String roleName) {
        Optional<User> optionalUser = userRepository.findByUsernameIgnoreCase(username);
        if (optionalUser.isEmpty()) {
            return "User not found: " + username;
        }

        try {
            UserRole role = UserRole.valueOf(roleName);
            userRoleService.addRole(username, role);
        } catch (IllegalArgumentException e) {
            return "Invalid role: " + roleName;
        }

        return "Role added successfully.";
    }
}
