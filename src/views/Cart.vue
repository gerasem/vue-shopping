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
            <div class="col-lg-8 order-2 order-lg-1">
              <template v-for="item in itemsInCart" :key="item.title">
                <cart-item :item="item">

                </cart-item>
              </template>
            </div>
            <div class="col-lg-4 order-1 order-lg-2">
              <div class="cart__form">
                <div class="cart__info">
                  Free shipping from {{ $store.state.cart.freeShippingFrom }}€
                </div>
                <div class="cart__form-container">
                  <div class="text-center">
                    <div class="row">
                      <div class="col text-end">
                        Price:
                      </div>
                      <div class="col text-start">
                        <span class="cart__form-price">{{ itemsPrice.toFixed(0) }}€</span>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col text-end">
                        Shipping:
                      </div>
                      <div class="col text-start">
                        <span class="cart__form-price">
                          {{ freeShipping ? "Free" : `${$store.state.cart.shippingCost}€` }}
                        </span>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col text-end">
                        Total price:
                      </div>
                      <div class="col text-start">
                         <span class="cart__form-price cart__form-price--total">
                           {{ totalPrice.toFixed(0) }}€
                         </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </template>
        <template v-else>
          <p>Shopping cart is empty</p>
        </template>

        <button-component v-show="itemsInCart.length" @clickOnButton="deleteCart()">
          Delete cart
        </button-component>
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
      itemsPrice: 0,
      totalPrice: 0,
    }
  },

  components: {
    vLoading,
    CartItem,
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, import.meta.env.VITE_TIMEOUT || 500);

    this.itemsPrice = this.itemsInCartTotalPrice;
    this.totalPrice = this.totalPriceWithShipping;
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

    freeShipping() {
      return this.$store.getters.freeShipping;
    },

    totalPriceWithShipping() {
      return this.$store.getters.totalPriceWithShipping;
    }
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
      gsap.to(this, {duration: 0.5, itemsPrice: Number(n) || 0})
    },

    totalPriceWithShipping(n) {
      gsap.to(this, {duration: 0.5, totalPrice: Number(n) || 0})
    },
  },
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

.cart {
  &__form {
    position: sticky;
    top: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    @media(max-width: $screen-lg-max) {
      margin: 2rem 0;
    }
  }

  &__form-container {
    padding: 1.5rem;
  }

  &__form-price {
    font-weight: 600;

    &--total {
      color: $color-primary;
    }
  }

  &__info {
    background-color: rgb(255, 249, 241);
    padding: 1rem 1.5rem;
    text-align: center;
    color: $color-secondary;
    font-weight: 600;
  }
}
</style>