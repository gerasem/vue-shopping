<template>
  <div class="col-auto">
    <div class="language__languages">
      <span :class="getLanguageClass('de')" @click="setLocale('de')">De</span>
      <span class="language__language-separator">/</span>
      <span :class="getLanguageClass('en')" @click="setLocale('en')">En</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "vLanguage",

  methods: {
    setLocale(language) {
      if (this.$i18n.locale === language) return;
      this.$store.dispatch("setLoading", true);
      this.$i18n.locale = language;
      this.$router.push({params: {locale: language}});
      this.$store.dispatch("setLoading", false);
    },

    getLanguageClass(locale) {
      if (locale === this.$i18n.locale) {
        return "language__current-language";
      } else {
        return "language__second-language";
      }
    }
  },
}
</script>

<style scoped lang="scss">
.language {
  &__languages {
    user-select: none;
  }

  &__current-language {
    color: #c8c8c8;
    cursor: not-allowed;
  }

  &__language-separator {
    color: #ebebeb;
    margin: 0 5px;
  }

  &__second-language {
    color: $color-icons;
    cursor: pointer;

    &:hover, &:focus {
      text-decoration: underline;
    }
  }
}
</style>