import {IoColorPalette, IoLanguage, IoLogInOutline, IoLogOutOutline, IoSettingsSharp,} from "react-icons/io5";
import {RiProfileLine} from "react-icons/ri";
import {IconType} from "react-icons";
import {LanguageKeyType} from "./Language.config.ts";

export type Visibility = "authenticated" | "not_authenticated" | "always";

export interface NavbarDropdownItemConfig {
    key: string;
    labelKey: LanguageKeyType;
    icon: IconType;
    visibleWhen: Visibility;
    submenuKey?: string;
}

export const navbarDropdownItems: NavbarDropdownItemConfig[] = [
    {
        key: "login",
        labelKey: "NAVBAR_DROPDOWN_LOGIN",
        icon: IoLogInOutline,
        visibleWhen: "not_authenticated",
    },
    {
        key: "profile",
        labelKey: "NAVBAR_DROPDOWN_PROFILE",
        icon: RiProfileLine,
        visibleWhen: "authenticated",
    },
    {
        key: "language",
        labelKey: "NAVBAR_DROPDOWN_LANGUAGE",
        icon: IoLanguage,
        visibleWhen: "always",
        submenuKey: "language",
    },
    {
        key: "theme",
        labelKey: "NAVBAR_DROPDOWN_THEME",
        icon: IoColorPalette,
        visibleWhen: "always",
        submenuKey: "theme",
    },
    {
        key: "settings",
        labelKey: "NAVBAR_DROPDOWN_SETTINGS",
        icon: IoSettingsSharp,
        visibleWhen: "authenticated"
    },
    {
        key: "logout",
        labelKey: "NAVBAR_DROPDOWN_LOGOUT",
        icon: IoLogOutOutline,
        visibleWhen: "authenticated",
    },
];