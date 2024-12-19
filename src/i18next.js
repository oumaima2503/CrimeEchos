// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json'; // Traduction anglaise
import frTranslation from './locales/fr.json'; // Traduction française

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    fr: { translation: frTranslation },
  },
  lng: 'en', // langue par défaut
  fallbackLng: 'en', // langue de secours
  interpolation: {
    escapeValue: false, // React gère l'échappement
  },
});

export default i18n;
