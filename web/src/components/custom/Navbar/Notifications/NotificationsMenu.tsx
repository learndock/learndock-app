import { useEffect, useRef, useState } from "react";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useIsAuthenticated } from "../../../../hooks/Auth.hooks";
import { useNotifications } from "../../../../hooks/User.hooks";
import IconButton from "../../../lib/Buttons/IconButton";
import Notification from "./Notification";
import { MdDoneAll } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { useLang } from "../../../../hooks/Language.hooks";

export const NotificationsMenu = () => {
    const { isAuthenticated, isLoading: authLoading } = useIsAuthenticated();
    const {
        notifications,
        refetch,
        markSeen,
        markAllSeen,
        deleteNotification,
    } = useNotifications(!authLoading && isAuthenticated);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const lang = useLang();

    useEffect(() => {
        if (open && isAuthenticated) refetch();
    }, [open, isAuthenticated, refetch]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    const DropdownWrapper = ({ children }: { children: React.ReactNode }) => (
        <div className="absolute right-0 mt-2 w-80 bg-cards shadow-lg rounded-lg border border-borders overflow-hidden">
            {children}
        </div>
    );

    const NotAuthenticated = () => (
        <DropdownWrapper>
            <div className="px-4 py-3 text-center text-text-muted text-sm">
                {lang("NOTIFICATIONS_PLEASE_LOGIN")}
            </div>
        </DropdownWrapper>
    );

    const Authenticated = () => (
        <DropdownWrapper>
            <div className="flex justify-between items-center px-4 py-2 border-b border-borders z-[9999]">
                <span className="font-semibold text-text-primary">{lang("NOTIFICATIONS_TITLE")}</span>
                <div className="flex items-center gap-2">
                    <button
                        data-tooltip-id="mark-all-tooltip"
                        data-tooltip-content={lang("NOTIFICATIONS_MARK_ALL")}
                        className="p-1 rounded-full text-text-muted hover:text-text-primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            markAllSeen.mutate();
                        }}
                    >
                        <MdDoneAll size={16} />
                    </button>
                    <Tooltip id="mark-all-tooltip" place="bottom" />

                    <button
                        data-tooltip-id="view-all-tooltip"
                        data-tooltip-content={lang("NOTIFICATIONS_VIEW_ALL")}
                        className="p-1 rounded-full text-text-muted hover:text-text-primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate("/profile/notifications");
                            setOpen(false);
                        }}
                    >
                        <HiOutlineArrowsExpand size={16} />
                    </button>
                    <Tooltip id="view-all-tooltip" place="bottom" />
                </div>
            </div>
            <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-text-muted">
                        {lang("NOTIFICATIONS_EMPTY")}
                    </div>
                ) : (
                    notifications.map((n) => (
                        <Notification
                            key={n.id}
                            notification={n}
                            closeMenu={() => setOpen(false)}
                            markSeen={markSeen.mutate}
                            deleteNotification={deleteNotification.mutate}
                        />
                    ))
                )}
            </div>
        </DropdownWrapper>
    );

    return (
        <div ref={ref} className="relative">
            <IconButton
                aria-label={lang("NOTIFICATIONS_ARIA_LABEL_OPEN_BUTTON")}
                className="hidden md:inline-flex"
                icon={<IoNotificationsOutline size={24} />}
                iconFocus={<IoNotifications size={24} color="white" />}
                onFocusChange={(focused) => { if (focused) setOpen(true); }}
            />
            {open && (!authLoading && !isAuthenticated ? <NotAuthenticated /> : <Authenticated />)}
        </div>
    );
};

export default NotificationsMenu;
