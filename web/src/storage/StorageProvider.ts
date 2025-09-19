type StorageKey =
    | "language" // CHANGED TO DB STORAGE IN THE FUTURE
    | "theme" // CHANGED TO DB STORAGE IN THE FUTURE
    | "fallbackTheme"
    | "sidebarLocked"
    | "tryNavigateToTopic";

const defaultValues: Record<StorageKey, unknown> = {
    "language": navigator.language.split('-')[0], // Default to browser language
    "theme": "system",
    "fallbackTheme": "dark",
    "sidebarLocked": false,
    "tryNavigateToTopic": ""
}
export const getStorageValue = (storageKey: StorageKey): unknown => {
    const storedValue = localStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : defaultValues[storageKey];
}

export const setStorageValue = (storageKey: StorageKey, value: unknown): void => {
    localStorage.setItem(storageKey, JSON.stringify(value));
}