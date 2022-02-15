<template>
  <header>
    Header
  </header>
</template>

<script>
import {useI18n} from 'vue-i18n'
import Home from "../../views/Home";

export default {
  props: {},

  components: {
    Home

  },


  setup() {
    const {locale} = useI18n({useScope: 'global'})
    return {locale}
  },

  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
header {
  height: 100px;
  width: 100%;
  padding: 15px;
}
</style>