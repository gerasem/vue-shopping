<template>
  <header>

  </header>
</template>

<script>
import {useI18n} from 'vue-i18n'

export default {
  props: {

  },

  components: {

  },


  setup() {
    const {locale} = useI18n({useScope: 'global'})
    return {locale}
  },

  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>