import { IconType } from "react-icons";
import { NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import { LanguageKeyType } from "../../../config/Language.config";
import { useLang } from "../../../hooks/Language.hooks";

interface SidebarItemProps {
    icon: IconType;
    label: LanguageKeyType;
    to: string;
    expanded: boolean;
}
export default function SidebarItem({ icon: Icon, label, to, expanded }: SidebarItemProps) {
    const lang = useLang();

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-lg text-sm font-medium ${!isActive && "hover:bg-cards/50"} transition-colors 
                ${isActive ? "bg-cards text-text-primary" : "text-text-secondary"}`
            }
            data-tooltip-id={!expanded ? label : undefined}
        >
            <Icon className="text-xl shrink-0" />
            {expanded && <span className="truncate">{lang(label)}</span>}
            {!expanded && (
                <Tooltip id={label} place="right">
                    {lang(label)}
                </Tooltip>
            )}
        </NavLink>
    );
}
