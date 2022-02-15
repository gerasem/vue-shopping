<template>
  <template v-if="loading">

  </template>
  <template v-else>

  </template>
  <router-view/>
</template>

<script>
import {defineComponent, watch, ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {SUPPORT_LOCALES} from './i18n'

export default defineComponent({

  data() {
    return {
      loading: false,
    }
  },

  setup() {
    const router = useRouter();
    const {t, locale} = useI18n({useScope: 'global'});
    /**
     * select locale value for language select form
     *
     * If you use the vue-i18n composer `locale` property directly, it will be re-rendering component when this property is changed,
     * before dynamic import was used to asynchronously load and apply locale messages
     * To avoid this, use the another locale reactive value.
     */
    const currentLocale = ref(locale.value);
    // sync to switch locale from router locale path
    watch(router.currentRoute, route => {
      currentLocale.value = route.params.locale;
    });

    return {t, locale, currentLocale, supportLocales: SUPPORT_LOCALES};
  },

})
</script>

<style>
</style>
