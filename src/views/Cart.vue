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
                <cart-item :item="item">

                </cart-item>
              </div>
            </div>
            <div class="col-sm-12 col-md-4">
              Total price: {{ totalPrice.toFixed(0) }} €
            </div>
          </div>
        </template>
        <template v-else>
          <p>Shopping cart is empty</p>
        </template>
        <div v-show="itemsInCart.length" class="cart__button cart__button--delete" @click="deleteCart()">
          Delete cart
        </div>
      </main>
    </template>
  </Transition>
</template>

<script>
import vLoading from "@/components/layout/vLoading.vue";
import CartItem from "@/components/layout/CartItem.vue";
import gsap from "gsap";

export default {
  name: "Cart",
  data() {
    return {
      loading: true,
      totalPrice: 0,
    }
  },

  components: {
    vLoading,
    CartItem
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, import.meta.env.VITE_TIMEOUT || 500);

    this.totalPrice = this.itemsInCartTotalPrice;
  },

  computed: {
    search() {
      return this.$store.state.items.search;
    },

    itemsInCartTotalPrice() {
      return this.$store.getters.getTotal.price;
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

  methods: {
    deleteCart() {
      this.$store.dispatch("setLoading", true);
      this.$store.commit('deleteCart');
      this.$store.dispatch("setLoading", false);
    },

  },

  watch: {
    search() {
      if (this.search.length > 0) {
        this.$router.push({name: 'home', params: {locale: this.$i18n.locale}})
      }
    },

    itemsInCartTotalPrice(n) {
      gsap.to(this, {duration: 0.5, totalPrice: Number(n) || 0})
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