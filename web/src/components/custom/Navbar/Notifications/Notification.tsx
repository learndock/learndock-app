import * as Icons from "react-icons/md";
import { FiX, FiEye } from "react-icons/fi";
import { UserNotification } from "../../../../types/User.types";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import { useLang } from "../../../../hooks/Language.hooks";

export const Notification = ({
    notification,
    closeMenu,
    markSeen,
    deleteNotification
}: {
    notification: UserNotification,
    closeMenu: () => void,
    markSeen: (id: number) => void,
    deleteNotification: (id: number) => void
}) => {

    const navigate = useNavigate();
    const lang = useLang();

    const Icon = (Icons as any)[notification.icon] ?? Icons.MdInfoOutline;
    return (
        <div
            key={notification.id}
            onClick={() => {
                markSeen(notification.id);
                navigate(notification.link);
                closeMenu();
            }}
            className={`flex items-start px-4 py-3 gap-3 cursor-pointer hover:bg-background transition ${!notification.seen ? "bg-background" : ""
                }`}
        >
            <div className="w-6 h-6 mt-1 shrink-0 flex items-center justify-center">
                <Icon size={20} />
            </div>
            <div className="flex-1">
                <div className="font-medium text-text-primary">{notification.title}</div>
                <div className="text-sm text-text-muted">{notification.description}</div>
            </div>
            <div className="flex items-center gap-2">
                {!notification.seen && (
                    <button
                        aria-label={lang("NOTIFICATION_MARK_AS_READ")}
                        className="text-text-muted hover:text-text-primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            markSeen(notification.id);
                        }}
                    >
                        <FiEye size={14} />
                    </button>
                )}
                <button
                    aria-label={lang("NOTIFICATION_DELETE")}
                    data-tooltip-id="delete-notification-tooltip"
                    data-tooltip-content={lang("NOTIFICATION_DELETE")}
                    className="text-text-muted hover:text-text-primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                    }}
                >
                    <FiX size={14} />
                </button>
                <Tooltip id="delete-notification-tooltip" place="left" />
            </div>
        </div>
    );

};

export default Notification;
