import i18n from "i18next";

export const LanguageKey = {
    COMMON_SEE_MORE: "common.see.more",
    COMMON_SEARCH_PLACEHOLDER: "common.search.placeholder",
    COMMON_ADD: "common.add",
    COMMON_BACK: "common.back",
    COMMON_SAVE: "common.save",
    COMMON_CANCEL: "common.cancel",
    COMMON_EDIT: "common.edit",
    COMMON_LINK: "common.link",
    COMMON_UNLINK: "common.unlink",
    COMMON_DELETE: "common.delete", //
    COMMON_DELETING: "common.deleting", //
    COMMON_UNKNOWN: "common.unknown",
    COMMON_TITLE: "common.title",
    COMMON_DESCRIPTION: "common.description",

    ERROR_PAGE_ROLE_PROTECTED_TITLE: "error.page_role_protected.title", //
    ERROR_PAGE_ROLE_PROTECTED_SUBTITLE: "error.page_role_protected.subtitle", //
    ERROR_PAGE_NOT_FOUND: "error.page_not_found",
    ERROR_USER_ALREADY_REGISTERED: "error.user_already_registered",
    ERROR_INVALID_CREDENTIALS: "error.invalid_credentials",
    ERROR_TOKEN_INVALID: "error.token_invalid",
    ERROR_UNEXPECTED: "error.unexpected",

    SUCCESS_USER_REGISTERED: "success.user_registered",
    SUCCESS_TOKEN_REFRESHED: "success.token_refreshed",

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
    AUTH_LOGIN_TO_USE_FEATURE: "auth.login_to_use_feature",

    NAVBAR_MENU: "navbar.menu",
    NAVBAR_NOTIFICATIONS: "navbar.notifications",
    NAVBAR_APPS: "navbar.apps",
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

    SEARCH_RESULT_TYPE_CATALOG: "search.result.type.catalog", // 
    SEARCH_RESULT_TYPE_COMPETENCE: "search.result.type.competence", //
    SEARCH_RESULT_TYPE_TOPIC: "search.result.type.topic", //

    SIDEBAR_HOME: "sidebar.home",
    SIDEBAR_CATALOGS: "sidebar.catalogs",
    SIDEBAR_COMPETENCES: "sidebar.competences", //
    SIDEBAR_TECHNICAL: "sidebar.technical",

    NOTIFICATIONS_PLEASE_LOGIN: "notifications.please_login",
    NOTIFICATIONS_TITLE: "notifications.title",
    NOTIFICATIONS_MARK_ALL: "notifications.mark_all",
    NOTIFICATIONS_VIEW_ALL: "notifications.view_all",
    NOTIFICATIONS_EMPTY: "notifications.empty",
    NOTIFICATIONS_ARIA_LABEL_OPEN_BUTTON: "notifications.aria_label_open_button",
    NOTIFICATION_MARK_AS_READ: "notification.mark_as_read",
    NOTIFICATION_DELETE: "notification.delete",

    HOMEPAGE_WELCOME: "Willkommen bei LearnDock!",

    CATALOG_OVERVIEW_TITLE: "catalog.overview.title",
    CATALOG_OVERVIEW_SHORT_DESCRIPTION: "catalog.overview.short_description",
    CATALOG_NO_CATALOGS: "catalog.no_catalogs",
    CATALOG_DETAIL_NOT_FOUND: "catalog.detail.not_found",
    CATALOG_DETAIL_NO_DESCRIPTION: "catalog.detail.no_description",
    CATALOG_DETAIL_CREATED_AT: "catalog.detail.created_at",
    CATALOG_DETAIL_UPDATED_AT: "catalog.detail.updated_at",
    CATALOG_DETAIL_QUESTION_SETS: "catalog.detail.question_sets",
    CATALOG_DETAIL_NO_QUESTION_SETS: "catalog.detail.no_question_sets",
    CATALOG_DETAIL_VIEW_QUESTION_SET: "catalog.detail.view_question_set",
    CATALOG_DETAIL_QUESTION_SET_TITLE: "catalog.detail.question_set_title",
    CATALOG_DETAIL_LOCATION: "catalog.detail.location",
    CATALOG_DETAIL_LEARNING_FIELDS: "catalog.detail.learning_fields",
    CATALOG_DETAIL_QUESTION_SET_VIEW_EXAMPLES: "catalog.detail.question_set.view_examples",
    CATALOG_DETAIL_COMPETENCE_VIEW: "catalog.detail.competence.view",
    CATALOG_ADD_TITLE: "catalog.add.title", //
    CATALOG_DELETE_TITLE: "catalog.delete.title", //
    CATALOG_DELETE_CONFIRM: "catalog.delete.confirm", //

    QUESTION_SET_ADD_TITLE: "question_set.add.title", // 
    QUESTION_SET_DELETE_TITLE: "question_set.delete.title", //
    QUESTION_SET_DELETE_CONFIRM: "question_set.delete.confirm", //

    TOPIC_ADD_TITLE: "topic.add.title", // 
    TOPIC_DELETE_TITLE: "topic.delete.title", //
    TOPIC_DELETE_CONFIRM: "topic.delete.confirm", //

    COMPETENCE_SELF_ASSESSMENT: "competence.self_assessment",
    COMPETENCE_SELF_ASSESSMENT_HISTORY: "competence.self_assessment.history",
    COMPETENCE_SELF_ASSESSMENT_COMPLETED: "competence.self_assessment.completed",
    COMPETENCE_YOUR_CURRENT_ASSESSMENT: "competence.your_current_assessment",
    COMPETENCE_CLICK_TO_ADJUST: "competence.click_to_adjust",
    COMPETENCE_SEE_HISTORY: "competence.see_history",
    COMPETENCE_HISTORY_DATE: "competence.history.date",
    COMPETENCE_HISTORY_ASSESSMENT: "competence.history.assessment",
    COMPETENCE_TOPICS_CONTAINING_COMPETENCE: "competence.topics.containing_competence",
    COMPETENCE_TOPICS_NO_TOPICS: "competence.topics.no_topics",
    COMPETENCE_TOPICS_VIEW_CATALOG: "competence.topics.view_catalog",
    COMPETENCE_LINK_TOPICS_TITLE: "competence.link_topics.title",
    COMPETENCE_LINK_TOPICS_SUBTITLE: "competence.link_topics.subtitle",
    COMPETENCE_LINK_TOPICS_TOO_MANY_RESULTS: "competence.link_topics.too_many_results",
    COMPETENCE_ADD_TITLE: "competence.add.title", //
    COMPETENCE_DELETE_TITLE: "competence.delete.title", //
    COMPETENCE_DELETE_CONFIRM: "competence.delete.confirm", //

    COMPETENCE_OVERVIEW_TITLE: "competence.overview.title", //
    COMPETENCE_OVERVIEW_SHORT_DESCRIPTION: "competence.overview.short_description", //
    COMPETENCE_NO_RESULTS: "competence.no_results", // 
    COMPETENCE_SEARCH_TRUNCATED: "competence.search.truncated", //
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
