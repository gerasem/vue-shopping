<template>
  <template v-if="loading">
    <v-loading></v-loading>
  </template>
  <Transition>
    <template v-if="!loading">
      <main class="container-fluid">
        <h1>Cart</h1>
        <template v-if="itemsInCart.length">
          <div class="row">
            <div class="col-sm-12 col-md-8">
              <div class="cart__items" v-for="item in itemsInCart" :key="item.title">
                <div class="cart__item">
                  <a :href="item.slug" class="cart__image">
                    <img :src="item.image" :alt="item.title">
                  </a>
                  <div class="cart__main">
                    <div class="cart__prices">
                      {{ item.price }}
                    </div>
                    <h4 class="cart__title">{{ item.title }}</h4>
                  </div>
                  <div class="cart__actions">
                    <input type="text" :value="item.quantity">
                  </div>
                  <a href="#">X</a>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <p>Shopping cart is empty</p>
        </template>
      </main>
    </template>
  </Transition>
</template>

<script>
import vLoading from "@/components/layout/vLoading.vue";

export default {
  name: "Cart",
  data() {
    return {
      loading: true,
    }
  },

  components: {
    vLoading,
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, import.meta.env.VITE_TIMEOUT || 500);
  },

  computed: {
    search() {
      return this.$store.state.items.search;
    },

    itemsInCart: {
      get() {
        return this.$store.state.cart.itemsInCart;
      },
      set(value) {
        this.$store.commit('addProductToCart', value)
      }
    },
  },

  watch: {
    search() {
      if (this.search.length > 0) {
        this.$router.push({name: 'home', params: {locale: this.$i18n.locale}})
      }
    }
  }
}
</script>

<style scoped lang="scss">
.v-enter-active {
  transition: all .3s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>