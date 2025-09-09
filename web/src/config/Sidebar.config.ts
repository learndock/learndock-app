import { IconType } from "react-icons";
import { FaHome, FaBookmark, FaHistory, FaCompass } from "react-icons/fa";
import { LanguageKeyType } from "./Language.config";

export const sidebarItems: {
    icon: IconType;
    label: LanguageKeyType;
    to: string;
}[] = [
    { icon: FaHome, label: "SIDEBAR_HOME", to: "/" },
    { icon: FaCompass, label: "SIDEBAR_DISCOVER", to: "/discover" },
    { icon: FaBookmark, label: "SIDEBAR_SAVED", to: "/saved" },
    { icon: FaHistory, label: "SIDEBAR_HISTORY", to: "/history" }
];