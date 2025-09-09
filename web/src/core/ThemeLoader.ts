import {DEFAULT_THEME} from '../config/Themes.config';
import {fetchTheme, getUserSelectedTheme} from '../service/Themes.service';

const logThemeError = (themeName: string) => {
    console.error(
        `%cTheme %c"${themeName}"%c not found or invalid. Using default theme instead.`,
        'color: #ffffff;',
        'color: red;',
        'color: #ffffff;'
    );
};

const applyThemeVariables = (themeVars: Record<string, string>) => {
    Object.entries(themeVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
    });
};
const applyTheme = async (): Promise<void> => {
    const selectedTheme = getUserSelectedTheme();
    const loadTheme = async (themeName: string) => {
        try {
            const theme = await fetchTheme(themeName);
            if (!theme?.theme) throw new Error();
            return theme.theme;
        } catch {
            return null;
        }
    };

    let themeVariables = await loadTheme(selectedTheme);

    if (!themeVariables) {
        logThemeError(selectedTheme);
        themeVariables = await loadTheme(DEFAULT_THEME);

        if (!themeVariables) {
            throw new Error(
                `Default theme "${DEFAULT_THEME}" not found or invalid. Styles cannot be applied.`
            );
        }
    }

    applyThemeVariables(themeVariables);
};

export default applyTheme;
