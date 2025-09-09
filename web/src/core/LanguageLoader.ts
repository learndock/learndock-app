import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getStorageValue} from '../storage/StorageProvider';

const language: string = getStorageValue("language") as string;

const fetchTranslations = async () => {
    const response = await fetch(`/api/lang/${language}`);
    const translations = await response.json();

    await i18n
        .use(initReactI18next)
        .init({
            resources: {
                [language]: {
                    translation: translations
                }
            },
            lng: language,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false
            }
        });
};

export default fetchTranslations;
