import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import faTranslations from './locales/fa.json';

i18n
    .use(initReactI18next)
    .init({
        lng:localStorage.getItem('i18nextLng') || 'en',
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false, // React already safes from XSS
        },

        // If your translations are local
        resources: {
            en: {
                translation: enTranslations
            },
            fa: {
                translation: faTranslations

            }
        }
    });

export default i18n;
