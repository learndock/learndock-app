package com.learndock.learndock.service.users;

import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.models.users.UserRole;
import com.learndock.learndock.domain.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserRoleService {

    private final UserRepository userRepository;

    @Transactional
    public void addRole(String username, UserRole role) {
        User user = userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.getRoles().add(role);
        userRepository.save(user);
    }

    @Transactional
    public void removeRole(String username, UserRole role) {
        User user = userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.getRoles().remove(role);
        userRepository.save(user);
    }

    public Set<UserRole> getRoles(String username) {
        User user = userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getRoles();
    }
}