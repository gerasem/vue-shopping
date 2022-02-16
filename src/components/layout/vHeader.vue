<template>
  <header class="header__container">
    <div class="container-xxl">
      <div class="row">
        <div class="col">
          <router-link to="/" class="header__logo">Logo</router-link>
          <span class="header__slogan">Lorem ipsum</span>
        </div>

        <div class="col-auto">
          <div class="header__languages">
            DE / EN
          </div>
        </div>

        <div class="col-auto">
          <router-link to="/" class="header__contact">
            Contact
          </router-link>
        </div>

        <div class="col-auto">
          <div class="header__search">
            <input type="text" class="form-input">
          </div>
        </div>

        <div class="col-auto">
          <div class="header__icons">
            <router-link to="/">
              <i class="icon bi bi-person" style="font-size: 28px"></i>
            </router-link>
            <router-link to="/">
              <i class="icon bi bi-heart"></i>
            </router-link>
            <router-link to="/">
              <i class="icon bi bi-bag"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {useI18n} from 'vue-i18n'

export default {
  props: {},

  components: {},


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

.header{
  &__container{
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }
}

</style>