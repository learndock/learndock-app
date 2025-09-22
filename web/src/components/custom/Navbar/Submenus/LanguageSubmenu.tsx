import React from "react";
import {getStorageValue, setStorageValue} from "../../../../core/StorageProvider.ts";
import {useLang} from "../../../../hooks/Language.hooks.ts";
import {useNavigate} from "react-router";
import {BiCheck, BiPlus} from "react-icons/bi";
import {NavbarSubmenuProps} from "../NavbarSubmenuController.tsx";
const LanguageSubmenu: React.FC<NavbarSubmenuProps> = ({ closeDropdown }) => {
    const navigate = useNavigate();
    const lang  = useLang();
    const selectedLangKey = getStorageValue("language") as string;

    const displayNames = new Intl.DisplayNames([navigator.language], { type: "language" });

    const seen = new Set<string>();
    const quickAccessLanguages: { label: string; langKey: string }[] = [];

    [selectedLangKey, ...navigator.languages].forEach((langCode) => {
        const langKey = langCode.split("-")[0];

        if (seen.has(langKey)) return;
        seen.add(langKey);

        quickAccessLanguages.push({
            label: displayNames.of(langKey) || langKey,
            langKey
        });
    });

    function changeLanguage(langKey: string) {
        setStorageValue("language", langKey);
        window.location.reload();
    }

    return (
        <div>
            {quickAccessLanguages.map((lang) => (
                <button
                    key={lang.langKey}
                    onClick={() => changeLanguage(lang.langKey)}
                    className="w-full px-4 py-3 text-left flex items-center gap-3 text-text-primary hover:bg-cards focus:outline-none transition-all"
                >
                    {lang.label}
                    {lang.langKey == selectedLangKey && (<span className="text-accent text-xl ms-auto"><BiCheck/></span>)}
                </button>
            ))}
            <button
                key={"more"}
                onClick={() => {
                    navigate("/settings/languages");
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

export default LanguageSubmenu;
