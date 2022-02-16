<template>
  <header class="header__container">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <router-link to="/" class="header__logo">
            Logo
            <span class="header__slogan">Lorem ipsum</span>
          </router-link>

        </div>

        <div class="col-auto">
          <div class="header__languages">
            <span class="header__current-language">De</span>
            <span class="header__language-separator">/</span>
            <span class="header__second-language">En</span>
          </div>
        </div>

        <div class="col-auto">
          <router-link to="/" class="header__contact">
            Contact
          </router-link>
        </div>

        <div class="col-auto">
          <div class="header__search">
            <input type="text" class="form-control input__search" placeholder="Search ...">
            <i class="icon__input bi bi-search"></i>
          </div>
        </div>

        <div class="col-auto">
          <div class="header__icons">
            <router-link to="/" class="icon__link">
              <i class="icon__content icon__content--user bi bi-person"></i>
            </router-link>
            <router-link to="/" class="icon__link">
              <i class="icon__content bi bi-heart"></i>
            </router-link>
            <router-link to="/" class="icon__link icon__link--active">
              <i class="icon__content icon__content--bag bi bi-bag"></i>
              <span class="icon__count">3</span>
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
.header {
  &__container {
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__logo {
    color: $color-text;
    font-size: 25px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 3px;
    user-select: none;
    display: flex;
    align-items: center;
    &:hover, &:focus {
      color: $color-text;
      text-decoration: none;
    }
  }

  &__slogan {
    padding-left: 20px;
    color: $text-muted;
    user-select: none;
    font-size: 16px;
    text-transform: none;
    letter-spacing: normal;
  }

  &__current-language {
    color: #c8c8c8;
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

  &__contact {
    color: $color-text;
    padding: 15px 20px;
    text-decoration: none;

    &:hover, &:focus {
      background-color: $background-gray;
      text-decoration: none;
    }
  }

  &__search {
    position: relative;
    margin-top: -3px;
    .icon__input {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__icons{
    display: flex;
    align-items: start;
  }
}
</style>