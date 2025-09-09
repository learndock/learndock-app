package com.learndock.learndock.service.users.notifications;

import com.learndock.learndock.domain.models.users.User;
import com.learndock.learndock.domain.models.users.notifications.NotificationSeverity;
import com.learndock.learndock.domain.models.users.notifications.NotificationType;
import com.learndock.learndock.domain.models.users.notifications.UserNotification;
import com.learndock.learndock.domain.repositories.UserNotificationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserNotificationServiceImpl implements UserNotificationService {

    private final UserNotificationRepository notificationRepository;

    @Override
    public UserNotification createNotification(
            User user,
            NotificationType type,
            NotificationSeverity severity,
            String icon,
            String title,
            String description,
            String targetUrl
    ) {
        UserNotification notification = new UserNotification();
        notification.setUser(user);
        notification.setType(type);
        notification.setSeverity(severity);
        notification.setIcon(icon);
        notification.setTitle(title);
        notification.setDescription(description);
        notification.setSeen(false);
        notification.setLink(targetUrl);
        notification.setCreatedAt(new Date());

        return notificationRepository.save(notification);
    }

    @Override
    public List<UserNotification> getAllNotifications(User user) {
        return notificationRepository.findAllByUser(user);
    }

    @Override
    public List<UserNotification> getUnreadNotifications(User user) {
        return notificationRepository.findAllByUserAndSeenFalse(user);
    }

    @Override
    @Transactional
    public void markAsSeen(Long notificationId, User user) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            if (notification.getUser().equals(user)) {
                notification.setSeen(true);
            }
        });
    }

    @Override
    @Transactional
    public void deleteNotification(Long notificationId, User user) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            if (notification.getUser().equals(user)) {
                notificationRepository.delete(notification);
            }
        });
    }

    @Override
    @Transactional
    public void markAllAsSeen(User user) {
        List<UserNotification> unread = notificationRepository.findAllByUserAndSeenFalse(user);
        for (UserNotification n : unread) {
            n.setSeen(true);
        }
    }

    @Override
    @Transactional
    public void deleteAllNotifications(User user) {
        List<UserNotification> all = notificationRepository.findAllByUser(user);
        notificationRepository.deleteAll(all);
    }
}
