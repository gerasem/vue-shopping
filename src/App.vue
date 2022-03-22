<template>
  <template v-if="loading">
    <v-loading></v-loading>
  </template>
  <template v-else>

    <Toast position="top-right" group="cart">
      <template #message="slotProps">
        <div class="flex-fill me-2">
          {{ slotProps.message.summary }}
          <template v-if="slotProps.message.detail === 'cart'">
            <router-link :to="{name: 'cart', params: {locale: this.$i18n.locale}}"
                         class="ms-1">
              Go to shopping cart
            </router-link>
          </template>
          <template v-else>{{ slotProps.message.detail }}</template>
        </div>
      </template>
    </Toast>

    <v-header></v-header>
    <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          Hello, world! This is a toast message.
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
    <router-view/>
  </template>
</template>

<script>
import {defineComponent, watch, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {SUPPORT_LOCALES} from './i18n'
import vHeader from "@/components/layout/vHeader.vue";
import vLoading from "@/components/layout/vLoading.vue";
import Toast from 'primevue/toast';

export default defineComponent({
  components: {
    vHeader,
    vLoading,
    Toast,
  },

  data() {
    return {}
  },

  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },

  created() {
    this.$store.dispatch("getAllItems");
    this.$store.dispatch("initShoppingCart");
    this.$store.dispatch("getCategories");
    this.$store.dispatch("setLoading", false);
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

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.p-toast-message {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  background-color: #fff;
}

.p-toast {
  width: auto;
}

.p-component {
  font-family: inherit !important;
}
</style>
