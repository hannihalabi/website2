import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from './locales/en.json';
import sv from './locales/sv.json';

const resources = { en, sv };
const fallbackLocale = 'en';

const I18nContext = createContext({
  locale: fallbackLocale,
  setLocale: () => {},
  t: (key) => key,
});

const normalizeLocale = (locale) => {
  if (!locale) return fallbackLocale;
  const lower = locale.toLowerCase();
  const match = Object.keys(resources).find((lng) => lower === lng || lower.startsWith(`${lng}-`));
  return match || fallbackLocale;
};

const getNestedValue = (obj, path) =>
  path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);

export const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(fallbackLocale);

  useEffect(() => {
    const stored =
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem('locale')
        : null;
    const detected =
      typeof navigator !== 'undefined'
        ? navigator.languages?.[0] || navigator.language
        : fallbackLocale;
    const initial = normalizeLocale(stored || detected);
    setLocale(initial);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('locale', locale);
    }
  }, [locale]);

  const t = useMemo(() => {
    const dict = resources[locale] || resources[fallbackLocale];
    return (key) => {
      const val = getNestedValue(dict, key);
      if (val !== undefined) return val;
      const fallbackVal = getNestedValue(resources[fallbackLocale], key);
      return fallbackVal !== undefined ? fallbackVal : key;
    };
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
export const availableLocales = Object.keys(resources);
