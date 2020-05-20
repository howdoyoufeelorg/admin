import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from "ra-language-english";
import spanishMessages from "ra-language-spanish";

const i18nProvider = polyglotI18nProvider(locale =>
        locale === 'es' ? spanishMessages : englishMessages,
    'en', // Default locale
    {
        allowMissing: true
    }
);

export default i18nProvider