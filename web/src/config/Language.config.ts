import i18n from "i18next";

export const LanguageKey = {
    ERROR_PAGE_NOT_FOUND: "error.page_not_found",
    ERROR_UNEXPECTED: "error.unexpected",
    AUTH_USERNAME: "auth.username",
    AUTH_PASSWORD: "auth.password",
    AUTH_REGISTER: "auth.register",
    AUTH_REGISTER_TITLE: "auth.register.title",
    AUTH_REGISTER_REGISTER_HERE: "auth.register.register_here",
    AUTH_LOGIN: "auth.login",
    AUTH_LOGIN_TITLE: "auth.login.title",
    AUTH_LOGIN_LOGIN_HERE: "auth.login.login_here",
    AUTH_NO_ACCOUNT: "auth.no_account",
    AUTH_ALREADY_HAVE_ACCOUNT: "auth.already_have_account",
    AUTH_LOGOUT: "auth.logout",
    AUTH_OR: "auth.or",
    AUTH_USERNAME_PLACEHOLDER: "auth.username_placeholder",
    AUTH_PASSWORD_PLACEHOLDER: "auth.password_placeholder",
    SUCCESS_USER_REGISTERED: "success.user_registered",
    SUCCESS_TOKEN_REFRESHED: "success.token_refreshed",
    ERROR_USER_ALREADY_REGISTERED: "error.user_already_registered",
    ERROR_INVALID_CREDENTIALS: "error.invalid_credentials",
    ERROR_TOKEN_INVALID: "error.token_invalid",
    NAVBAR_MENU: "navbar.menu",
    NAVBAR_NOTIFICATIONS: "navbar.notifications",
    NAVBAR_APPS: "navbar.apps",
    NAVBAR_SEARCH_PLACEHOLDER: "navbar.search.placeholder",
    NAVBAR_DROPDOWN_PROFILE: "navbar.dropdown.profile",
    NAVBAR_DROPDOWN_LANGUAGE: "navbar.dropdown.language",
    NAVBAR_DROPDOWN_THEME: "navbar.dropdown.theme",
    NAVBAR_DROPDOWN_SETTINGS: "navbar.dropdown.settings",
    NAVBAR_DROPDOWN_LOGIN: "navbar.dropdown.login",
    NAVBAR_DROPDOWN_REGISTER: "navbar.dropdown.register",
    NAVBAR_DROPDOWN_LOGOUT: "navbar.dropdown.logout",
    NAVBAR_SELECT_LANGUAGE: "navbar.select.language.title",
    NAVBAR_SELECT_THEME: "navbar.select.theme.title",
    NAVBAR_SELECT_MORE: "navbar.select.more",

    SIDEBAR_HOME: "sidebar.home",
    SIDEBAR_DISCOVER: "sidebar.discover",
    SIDEBAR_SAVED: "sidebar.saved",
    SIDEBAR_HISTORY: "sidebar.history",

    NOTIFICATIONS_PLEASE_LOGIN: "notifications.please_login",
    NOTIFICATIONS_TITLE: "notifications.title",
    NOTIFICATIONS_MARK_ALL: "notifications.mark_all",
    NOTIFICATIONS_VIEW_ALL: "notifications.view_all",
    NOTIFICATIONS_EMPTY: "notifications.empty",
    NOTIFICATIONS_ARIA_LABEL_OPEN_BUTTON: "notifications.aria_label_open_button",
    NOTIFICATION_MARK_AS_READ: "notification.mark_as_read",
    NOTIFICATION_DELETE: "notification.delete",


    HOMEPAGE_WELCOME: "Welcome to LearnDock!",
    COMMON_SEE_MORE: "See more",


} as const;

export type LanguageKeyType = keyof typeof LanguageKey;

/**
 * Only to be used when not possible in any other way.<br/>
 * Please consider using the `useLang()` hook instead.
 *
 * @param key
 */
export const getLanguage = (key: LanguageKeyType): string => {
    return i18n.t(LanguageKey[key]);
}
