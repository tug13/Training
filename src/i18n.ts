import { createI18n } from "vue-i18n";
import en from './locales/en.json';
import fr from './locales/fr.json';

export type Message = typeof en;

export default createI18n<[Message],'en' | 'fr'>({
    legacy: false,
    locale: 'en',
    messages:{
        en,
        fr
    }
});
