package com.learndock.learndock.domain.models.users.notifications;

public enum NotificationType {
    ACCOUNT, // Account-related notifications like logins from suspicious locations, password changes, etc.
    CONTENT, // Content-related notifications such as episodes of interest, new releases, etc.
    APPLICATION // Application-related notifications including xami-updates, maintenance, etc.
}
