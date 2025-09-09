package com.learndock.learndock.commands.users;

import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.models.users.notifications.NotificationSeverity;
import com.learndock.learndock.domain.models.users.notifications.NotificationType;
import com.learndock.learndock.domain.models.users.notifications.UserNotification;
import com.learndock.learndock.domain.repositories.UserRepository;
import com.learndock.learndock.service.users.notifications.UserNotificationService;
import lombok.AllArgsConstructor;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;

import java.util.Optional;

@ShellComponent
@AllArgsConstructor
public class UserNotificationCommands {

    private final UserNotificationService notificationService;
    private final UserRepository userRepository;

    @ShellMethod(value = "Create a notification for a user")
    public String addNotification(
            @ShellOption(help = "Username") String username,
            @ShellOption(help = "Title") String title,
            @ShellOption(help = "Description") String description,
            @ShellOption(defaultValue = "ACCOUNT", help = "Type [ACCOUNT, CONTENT, APPLICATION]") NotificationType type,
            @ShellOption(defaultValue = "NORMAL", help = "Severity [VERY_HIGH, HIGH, NORMAL]") NotificationSeverity severity,
            @ShellOption(defaultValue = "MdInfoOutline", help = "React icon name") String icon,
            @ShellOption(defaultValue = "/profile/notifications", help = "Target URL") String targetUrl
    ) {
        Optional<User> optionalUser = userRepository.findByUsernameIgnoreCase(username);
        if (optionalUser.isEmpty()) {
            return "User not found: " + username;
        }

        User user = optionalUser.get();

        UserNotification created = notificationService.createNotification(
                user,
                type,
                severity,
                icon,
                title,
                description,
                targetUrl
        );

        return "Notification created with ID: " + created.getId();
    }
}
