import 'react-tooltip/dist/react-tooltip.css';
import { sidebarItems } from "../../../config/Sidebar.config.ts";
import SidebarItem from "./SidebarItem";
import { useUser } from '../../../hooks/User.hooks.ts';

export default function Sidebar({ locked }: { locked: boolean }) {
    const isExpanded = locked;

    const { user } = useUser();

    return (
        <aside
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-background  z-40 transition-all duration-300 ease-in-out
                ${isExpanded ? "w-60" : "w-15"}`}
        >
            {/* Scrollable Container */}
            <div
                className={`h-full overflow-y-auto ${isExpanded
                    ? "scrollbar-thin scrollbar-thumb-borders scrollbar-track-transparent"
                    : "scrollbar-none"
                    }`}
            >
                <nav className="flex flex-col gap-1 px-2 pt-2">
                    {sidebarItems.map((item) => {
                        if (item.onlyRoles && !user) return null;
                        if (item.onlyRoles && !item.onlyRoles.some(role => user?.roles.includes(role))) return null;

                        return <SidebarItem key={item.label} {...item} expanded={isExpanded} />;
                    })}
                </nav>
            </div>
        </aside>
    );
}
