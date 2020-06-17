import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from "ra-language-english";
import spanishMessages from "ra-language-spanish";
import {customMessages} from "./customMessages";

const english = Object.assign(englishMessages, customMessages.en);
const spanish = Object.assign(spanishMessages, customMessages.es);

const i18nProvider = polyglotI18nProvider(
    locale => locale === 'es' ? spanish : english,
    'en', // Default locale
    {
        allowMissing: false // This seems like a solution for missing translations, but if you turn it on the app crashes if inputs are empty (e.g. selects)
    }
);

export default i18nProvider