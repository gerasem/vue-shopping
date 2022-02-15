import {nextTick} from 'vue'
import {createI18n} from 'vue-i18n'


export const SUPPORT_LOCALES =  import.meta.env.VITE_VUE_APP_I18N_SUPPORTED_LOCALES ? import.meta.env.VITE_VUE_APP_I18N_SUPPORTED_LOCALES.split(',') : ['de']

function checkDefaultLanguage() {
    let matched = null;

    SUPPORT_LOCALES.forEach(lang => {
        if (lang === navigator.language) {
            matched = lang;
        }
    });
    if (!matched) {
        SUPPORT_LOCALES.forEach(lang => {
            let languagePartials = navigator.language.split('-')[0];
            if (lang === languagePartials) {
                matched = lang;
            }
        })
    }
    return matched || import.meta.env.VUE_APP_I18N_LOCALE || 'de';
}

export function setupI18n(options = {locale: checkDefaultLanguage()}) {
    const i18n = createI18n(options);
    setI18nLanguage(i18n, options.locale);
    return i18n;
}

export function setI18nLanguage(i18n, locale) {
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale;
    } else {
        i18n.global.locale.value = locale;
    }

    document.querySelector('html').setAttribute('lang', locale);
    document.dir = locale === "ar" ? "rtl" : "ltr";
}

export async function loadLocaleMessages(i18n, locale) {
    let messagesFromLocalFile = {};
    try {
        messagesFromLocalFile = await import(/* @vite-ignore */  `./locales/${locale}.json`);
    } catch (e) {
        console.error(`File for ${locale} not found`);
    }

    i18n.global.setLocaleMessage(locale, messagesFromLocalFile);
    return nextTick();
}