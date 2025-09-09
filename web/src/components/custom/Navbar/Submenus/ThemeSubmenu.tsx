import React from "react";
import {getStorageValue, setStorageValue} from "../../../../storage/StorageProvider.ts";
import {useLang} from "../../../../hooks/Language.hooks.ts";
import {useNavigate} from "react-router";
import {BiCheck, BiPlus} from "react-icons/bi";
import {NavbarSubmenuProps} from "../NavbarSubmenuController.tsx";
const ThemeSubmenu: React.FC<NavbarSubmenuProps> = ({ closeDropdown }) => {
    const navigate = useNavigate();
    const lang  = useLang();
    const selectedThemeKey = getStorageValue("theme") as string;

    const quickAccessThemes: { label: string; themeKey: string }[] = [
        { label: "System", themeKey: "system" },
        { label: "Light", themeKey: "default-light" },
        { label: "Dark", themeKey: "default-dark" },
    ];

    function changeTheme(themeKey: string) {
        setStorageValue("theme", themeKey);
        window.location.reload();
    }

    return (
        <div>
            {quickAccessThemes.map((theme) => (
                <button
                    key={theme.themeKey}
                    onClick={() => changeTheme(theme.themeKey)}
                    className="w-full px-4 py-3 text-left flex items-center gap-3 text-text-primary hover:bg-cards focus:outline-none transition-all"
                >
                    {theme.label}
                    {theme.themeKey == selectedThemeKey && (<span className="text-accent text-xl ms-auto"><BiCheck/></span>)}
                </button>
            ))}
            <button
                key={"more"}
                onClick={() => {
                    navigate("/settings/themes");
                    closeDropdown();
                }}
                className="w-full px-4 py-3 text-left flex items-center gap-3 text-text-primary hover:bg-cards focus:outline-none transition-all"
            >
                <span className="text-accent text-xl"><BiPlus/></span>
                {lang("NAVBAR_SELECT_MORE")}
            </button>
        </div>
    );
};

export default ThemeSubmenu;
