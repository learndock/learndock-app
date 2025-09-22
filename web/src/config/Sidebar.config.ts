import { IconType } from "react-icons";
import { FaBookOpen, FaHome, FaLightbulb } from "react-icons/fa";
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
    { icon: FaLightbulb, label: "SIDEBAR_COMPETENCES", to: "/competence" },
    { icon: MdBiotech, label: "SIDEBAR_TECHNICAL", to: "/technical", onlyRoles: ["TECHNICAL"] },
];