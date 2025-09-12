export type UserRole = "MANAGE_CATALOGS" | "MANAGE_QUESTION_SETS" | "MANAGE_USERS" | "DB_ADMIN" | "TECHNICAL";

export interface User {
    userId: number;
    username: string;
    roles: UserRole[];
}

export interface ChangeRoleRequest {
    username: string;
    role: UserRole;
}

export type NotificationType = "ACCOUNT" | "CONTENT" | "APPLICATION";

export type NotificationSeverity = "VERY_HIGH" | "HIGH" | "NORMAL";

export interface UserNotification {
    id: number;
    type: NotificationType;
    severity: NotificationSeverity;
    icon: string;
    title: string;
    description: string;
    seen: boolean;
    link: string;
    notificationSystemVersion?: string;
    createdAt: Date;
}
