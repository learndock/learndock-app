import { ChangeRoleRequest, User, UserNotification, UserRole } from "../types/User.types";
import { FetchWrapper } from "../core/FetchWrapper";

export const getAllUsers = async (): Promise<User[]> => FetchWrapper.get<User[]>("/api/users/info/getUsers");
export const getSelf = async (): Promise<User> => FetchWrapper.get<User>("/api/users/info/self");

/////////////
/// ROLES ///
/////////////
export const getUserRoles = async (): Promise<UserRole[]> => FetchWrapper.get<UserRole[]>("/api/users/roles");
export const addUserRole = async (request: ChangeRoleRequest): Promise<void> => FetchWrapper.post<void>("/api/users/roles/add", request);
export const removeUserRole = async (request: ChangeRoleRequest): Promise<void> => FetchWrapper.post<void>("/api/users/roles/remove", request);

/////////////////////
/// NOTIFICATIONS ///
/////////////////////
export const getAllUserNotifications = async (): Promise<UserNotification[]> => FetchWrapper.get<UserNotification[]>("/api/users/notifications/all");
export const getUnreadUserNotifications = async (): Promise<UserNotification[]> => FetchWrapper.get<UserNotification[]>("/api/users/notifications/unread");
export const markUserNotificationAsSeen = async (id: number): Promise<void> => FetchWrapper.post<void>(`/api/users/notifications/${id}/seen`, {});
export const markAllUserNotificationsAsSeen = async (): Promise<void> => FetchWrapper.post<void>("/api/users/notifications/seen", {});
export const deleteUserNotification = async (id: number): Promise<void> => FetchWrapper.delete<void>(`/api/users/notifications/${id}`);
export const deleteAllUserNotifications = async (): Promise<void> => FetchWrapper.delete<void>("/api/users/notifications");