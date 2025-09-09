package com.learndock.learndock.api.controller.users.notifications;

import com.learndock.learndock.api.dto.users.notifications.UserNotificationDto;
import com.learndock.learndock.core.annotations.Authenticated;
import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.service.users.notifications.UserNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/notifications")
@RequiredArgsConstructor
public class UserNotificationController {

    private final UserNotificationService notificationService;

    @Authenticated
    @GetMapping("/all")
    public ResponseEntity<List<UserNotificationDto>> getAllNotifications(User user) {
        return ResponseEntity.ok(notificationService.getAllNotifications(user).stream().map(UserNotificationDto::new).toList());
    }

    @Authenticated
    @GetMapping("/unread")
    public ResponseEntity<List<UserNotificationDto>> getUnreadNotifications(User user) {
        return ResponseEntity.ok(notificationService.getUnreadNotifications(user).stream().map(UserNotificationDto::new).toList());
    }

    @Authenticated
    @PostMapping("/{id}/seen")
    public ResponseEntity<Void> markAsSeen(User user, @PathVariable Long id) {
        notificationService.markAsSeen(id, user);
        return ResponseEntity.ok().build();
    }

    @Authenticated
    @PostMapping("/seen")
    public ResponseEntity<Void> markAllAsSeen(User user) {
        notificationService.markAllAsSeen(user);
        return ResponseEntity.ok().build();
    }

    @Authenticated
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(User user, @PathVariable Long id) {
        notificationService.deleteNotification(id, user);
        return ResponseEntity.noContent().build();
    }

    @Authenticated
    @DeleteMapping
    public ResponseEntity<Void> deleteAllNotifications(User user) {
        notificationService.deleteAllNotifications(user);
        return ResponseEntity.noContent().build();
    }
}
