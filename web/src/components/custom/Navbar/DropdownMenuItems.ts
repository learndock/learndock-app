import {NavbarDropdownItemConfig} from "../../../config/Navbar.config.ts";
import {getNavbarSubmenu, NavbarSubmenuProps} from "./NavbarSubmenuController.tsx";
import React from "react";
import {LanguageKeyType} from "../../../config/Language.config.ts";

export const buildNavbarDropdownItems = (
    items: NavbarDropdownItemConfig[],
    lang: (key: LanguageKeyType) => string,
    isAuthenticated: boolean,
    handlers: Record<string, () => void>,
    submenuProps: NavbarSubmenuProps
) => {
    return items
        .filter(item =>
            item.visibleWhen === "always" ||
            (item.visibleWhen === "authenticated" && isAuthenticated) ||
            (item.visibleWhen === "not_authenticated" && !isAuthenticated)
        )
        .map(item => {
            const common = {
                label: lang(item.labelKey),
                icon: React.createElement(item.icon, { size: 20 }),
            };

            if (item.submenuKey) {
                const submenu = getNavbarSubmenu(item.submenuKey, submenuProps);
                if (submenu) return { ...common, submenu };
            }

            const actionMap: Record<string, () => void> = {
                login: handlers.openLogin,
                logout: handlers.handleLogout,
                profile: handlers.handleProfileClick,
                settings: handlers.handleSettingsClick,
            };

            return {
                ...common,
                onClick: actionMap[item.key] || (() => {}),
            };
        });
};