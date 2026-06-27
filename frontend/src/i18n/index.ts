import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import bn from './bn/bn.json';
import en from './en/en.json';

const savedLanguage = localStorage.getItem('language');

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            bn: { translation: bn },
        },
        lng:
            savedLanguage || navigator.language.split('-')[0],
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;