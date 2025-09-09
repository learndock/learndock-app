import { useTranslation } from "react-i18next";
import {LanguageKey, LanguageKeyType} from "../config/Language.config.ts";

export const useLang = () => {
    const { t } = useTranslation();

    return (key: LanguageKeyType) => t(LanguageKey[key]);
};
