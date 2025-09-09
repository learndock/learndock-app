import LanguageSubmenu from "./Submenus/LanguageSubmenu.tsx";
import {SubmenuDefinition} from "../../lib/Dropdown/Dropdown.tsx";
import UnknownSubmenu from "./Submenus/UnknownSubmenu.tsx";
import ThemeSubmenu from "./Submenus/ThemeSubmenu.tsx";

export interface NavbarSubmenuProps {
    closeDropdown: () => void;
}

export const getNavbarSubmenu = (key: string, props: NavbarSubmenuProps): SubmenuDefinition => {
    switch (key) {
        case "language":
            return {
                title: "NAVBAR_SELECT_LANGUAGE",
                content: <LanguageSubmenu {...props} />,
            };
        case "theme":
            return {
                title: "NAVBAR_SELECT_THEME",
                content: <ThemeSubmenu {...props} />,
            };
        default:
            return {
                title: "ERROR_UNEXPECTED",
                content: <UnknownSubmenu />,
            };
    }
};
