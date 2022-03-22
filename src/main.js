import {createApp} from 'vue'
import App from './App.vue'
import {setupI18n} from './i18n'
import {setupRouter} from './router'
import store from './store';
import "@/assets/css/main.scss"
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";       //theme
import "primevue/resources/primevue.min.css";                 //core css
import "primeicons/primeicons.css"                           //icons

const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    missingWarn: false,
    locale: import.meta.env.VUE_APP_I18N_LOCALE || 'de',
    fallbackLocale: import.meta.env.VUE_APP_I18N_LOCALE || 'de'
});

const router = setupRouter(i18n);

const app = createApp(App);

import components from '@/components/common/index.js';

components.forEach(component => {
    app.component(component.name, component);
});

app.use(router)
    .use(i18n)
    .use(store)
    .use(PrimeVue)
    .use(ToastService)
    .mount('#app');