package com.learndock.learndock.api.controller.users;

import com.learndock.learndock.api.dto.users.UserDto;
import com.learndock.learndock.core.annotations.Authenticated;
import com.learndock.learndock.core.annotations.Roles;
import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.service.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users/info")
public class UserInfoController {
    private final UserService userInfoService;

    @Authenticated
    @GetMapping("/self")
    public ResponseEntity<UserDto> getSelf(User user) {
        return ResponseEntity.ok(new UserDto(user));
    }

    @Roles({UserRole.MANAGE_USERS})
    @GetMapping("/getUsers")
    public List<UserDto> getUsers() {
        return userInfoService.getAllUsers();
    }
}
