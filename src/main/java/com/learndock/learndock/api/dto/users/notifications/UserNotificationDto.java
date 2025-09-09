package com.learndock.learndock.api.dto.users.notifications;

import com.learndock.learndock.domain.models.users.notifications.NotificationSeverity;
import com.learndock.learndock.domain.models.users.notifications.NotificationType;
import com.learndock.learndock.domain.models.users.notifications.UserNotification;
import lombok.Getter;

import java.util.Date;

@Getter
public class UserNotificationDto {

    private final Long id;
    private final NotificationType type;
    private final NotificationSeverity severity;
    private final String icon;
    private final String title;
    private final String description;
    private final boolean seen;
    private final String link;
    private final String notificationSystemVersion;
    private final Date createdAt;

    public UserNotificationDto(UserNotification notification) {
        this.id = notification.getId();
        this.type = notification.getType();
        this.severity = notification.getSeverity();
        this.icon = notification.getIcon();
        this.title = notification.getTitle();
        this.description = notification.getDescription();
        this.seen = notification.isSeen();
        this.link = notification.getLink();
        this.notificationSystemVersion = notification.getNotificationSystemVersion();
        this.createdAt = notification.getCreatedAt();
    }
}
