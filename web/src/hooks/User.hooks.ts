import { useQuery, useMutation, useQueryClient } from "react-query";
import {
    getAllUserNotifications,
    markUserNotificationAsSeen,
    deleteUserNotification,
    markAllUserNotificationsAsSeen,
} from "../service/User.service";
import { UserNotification } from "../types/User.types";

/**
 * Fetches all notifications and related data for the authenticated user.
 *
 * @param enableQuery Whether to enable the query (only enable when authenticated)
 * @returns notifications and query data
 */
export const useNotifications = (enableQuery: boolean) => {
    const queryClient = useQueryClient();

    const { data, refetch } = useQuery<UserNotification[]>({
        queryKey: ["notifications"],
        queryFn: getAllUserNotifications,
        enabled: enableQuery
    });

    const markSeen = useMutation({
        mutationFn: (id: number) => markUserNotificationAsSeen(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    });

    const markAllSeen = useMutation({
        mutationFn: markAllUserNotificationsAsSeen,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    });

    const deleteNotification = useMutation({
        mutationFn: (id: number) => deleteUserNotification(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
    });

    return {
        notifications: data || [],
        refetch,
        markSeen,
        markAllSeen,
        deleteNotification,
    };
};
