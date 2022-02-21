import {createApp} from 'vue'
import App from './App.vue'
import {setupI18n} from './i18n'
import {setupRouter} from './router'
import store from './store';
import "@/assets/css/main.scss"


const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    missingWarn: false,
    locale: import.meta.env.VUE_APP_I18N_LOCALE || 'de',
    fallbackLocale: import.meta.env.VUE_APP_I18N_LOCALE || 'de'
});

const router = setupRouter(i18n);

createApp(App)
    .use(router)
    .use(i18n)
    .use(store)
    .mount('#app');
