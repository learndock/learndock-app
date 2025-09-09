import { FetchWrapper } from "../core/FetchWrapper";
import { getStorageValue } from "../storage/StorageProvider";
import { Theme } from "../types/Themes.types";
export const getUserSelectedTheme = (): string => {
    const selectedTheme = getStorageValue("theme") as string;
    if(selectedTheme != "system") return selectedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "default-dark" : "default-light";
};

export const fetchAvailableThemes = async (): Promise<Theme[]> => FetchWrapper.get<Theme[]>("/api/users/info/getUsername");

export const fetchTheme = async (themeId: string): Promise<Theme> => FetchWrapper.get<Theme>(`/api/themes/${themeId}`);
