package com.learndock.learndock.service.users.notifications;

import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.models.users.notifications.NotificationSeverity;
import com.learndock.learndock.domain.models.users.notifications.NotificationType;
import com.learndock.learndock.domain.models.users.notifications.UserNotification;

import java.util.List;

public interface UserNotificationService {
    UserNotification createNotification(
            User user,
            NotificationType type,
            NotificationSeverity severity,
            String icon,
            String title,
            String description,
            String targetUrl
    );

    List<UserNotification> getAllNotifications(User user);

    List<UserNotification> getUnreadNotifications(User user);

    void markAsSeen(Long notificationId, User user);

    void deleteNotification(Long notificationId, User user);

    void markAllAsSeen(User user);

    void deleteAllNotifications(User user);
}
