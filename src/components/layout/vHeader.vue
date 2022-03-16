<template>
  <header class="header__container">
    <div class="container-fluid">
      <div class="row">

        <div class="col-auto d-flex d-lg-none">
          <icon-component icon="list"
                          @clickOnIcon="toggleMenu()">
          </icon-component>

          <icon-component icon="search" class="header__icon-container"
                          @clickOnIcon="showSearchInput()">
          </icon-component>
        </div>

        <div class="col">
          <router-link
              :to="{name: 'home', params: {locale: this.$i18n.locale}}"
              @click="handleOnClickOnLogo()"
              class="header__logo">
            Logo
            <span class="header__slogan d-none d-lg-block">Lorem ipsum</span>
          </router-link>
        </div>

        <v-language class="d-none d-md-block"></v-language>

        <div class="col-auto d-none d-md-block">
          <router-link to="/" class="header__contact">
            Contact
          </router-link>
        </div>

        <div class="col-auto d-none d-lg-block">
          <div class="header__search">
            <input type="text"
                   v-model="search"
                   class="form-control input__search"
                   :class="{'active': search}"
                   placeholder="Search ...">
            <icon-component :icon="search ? 'x-lg' : 'search'"
                            customClass="search-icon"
                            @clickOnIcon="handleClickOnSearchIcon()">
            </icon-component>
          </div>
        </div>

        <div class="col-auto">
          <div class="header__icons">

            <router-link to="/" class="d-none d-md-block">
              <icon-component icon="person" class="header__icon-container"></icon-component>
            </router-link>

            <router-link to="/">
              <icon-component icon="heart"
                              class="header__icon-container header__icon-container--first">
              </icon-component>
            </router-link>

            <router-link :to="{name: 'cart', params: {locale: this.$i18n.locale}}">
              <icon-component icon="bag" :count="totalCount" class="header__icon-container">
                {{ totalCount.toFixed(0) }}
              </icon-component>
            </router-link>

          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {useI18n} from 'vue-i18n';
import gsap from 'gsap';
import vLanguage from "@/components/layout/vLanguage.vue";


export default {
  props: {},

  components: {
    vLanguage
  },


  setup() {
    const {locale} = useI18n({useScope: 'global'})
    return {locale}
  },

  data() {
    return {
      totalCount: 0,
    }
  },

  created() {
    if (this.$route.name === 'search') {
      this.search = this.$route.query.s;
    }

    this.totalCount = this.itemsInCartTotalCount;
  },

  computed: {
    itemsInCartTotalCount() {
      return this.$store.getters.getTotal.quantity;
    },

    search: {
      get() {
        return this.$store.state.items.search;
      },
      set(value) {
        this.$store.commit('setSearch', value)
      }
    },
  },


  methods: {
    handleClickOnSearchIcon() {
      if (this.search) {
        this.search = "";
      }
    },

    handleOnClickOnLogo() {
      this.search = "";
      this.$store.commit('setSelectedCategory', null);
    },

    showSearchInput() {

    },

    toggleMenu() {

    }
  },

  watch: {
    $route(to) {
      if (to.name === 'home') return;
      if (to.name === 'search') return;
      this.search = "";
    },

    itemsInCartTotalCount(n) {
      gsap.to(this, {duration: 0.5, totalCount: Number(n) || 0})
    },
  },
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
    cursor: pointer;

    &:hover, &:focus {
      color: $color-text;
      text-decoration: none;
    }

    @media(max-width: $screen-md-max) {
      justify-content: center;
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
    display: flex;
  }

  &__icons {
    display: flex;
    align-items: start;

    a {
      text-decoration: none;
    }
  }

  &__icon-container {
    margin-left: 1.5rem;
    @media(max-width: $screen-md-max) {
      margin-left: 2.5rem;
    }
    @media(max-width: $screen-sm-max) {
      margin-left: 1rem;
    }

    &--first {
      margin-left: 1.5rem;
      @media(max-width: $screen-md-max) {
        margin-left: 0;
      }
    }
  }
}
</style>