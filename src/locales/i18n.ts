import i18n from 'i18next';
import { initReactI18next, Translation } from 'react-i18next';
import en from './en/translation.json';
import ur from './ur/translation.json';

i18n.use(initReactI18next).init({
    resources:{
        en: { translation : en },
        ur: { translation: ur},
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false}
});

export default i18n;