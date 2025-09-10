import { IconType } from "react-icons";
import { FaBookmark, FaBookOpen, FaHistory, FaHome } from "react-icons/fa";
import { LanguageKeyType } from "./Language.config";

export const sidebarItems: {
    icon: IconType;
    label: LanguageKeyType;
    to: string;
}[] = [
    { icon: FaHome, label: "SIDEBAR_HOME", to: "/" },
    { icon: FaBookOpen, label: "SIDEBAR_CATALOGS", to: "/catalog" },
    { icon: FaBookmark, label: "SIDEBAR_SAVED", to: "/saved" },
    { icon: FaHistory, label: "SIDEBAR_HISTORY", to: "/history" }
];