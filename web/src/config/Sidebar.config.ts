import { IconType } from "react-icons";
import { FaBookmark, FaBookOpen, FaHistory, FaHome } from "react-icons/fa";
import { MdBiotech } from "react-icons/md";
import { UserRole } from "../types/User.types";
import { LanguageKeyType } from "./Language.config";

export const sidebarItems: {
    icon: IconType;
    label: LanguageKeyType;
    to: string;
    onlyRoles?: UserRole[]; // User needs just one of these roles to see the item
}[] = [
    { icon: FaHome, label: "SIDEBAR_HOME", to: "/" },
    { icon: FaBookOpen, label: "SIDEBAR_CATALOGS", to: "/catalog" },
    { icon: FaBookmark, label: "SIDEBAR_SAVED", to: "/saved" },
    { icon: FaHistory, label: "SIDEBAR_HISTORY", to: "/history" },
    { icon: MdBiotech, label: "SIDEBAR_TECHNICAL", to: "/technical", onlyRoles: ["TECHNICAL"] },
];