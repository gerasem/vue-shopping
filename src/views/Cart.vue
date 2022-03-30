<template>
  <template v-if="loading">
    <v-loading></v-loading>
  </template>
  <Transition>
    <template v-if="!loading">
      <main class="container-fluid flex-grow-1">
        <h1>Cart</h1>
        <template v-if="itemsInCart.length">
          <div class="row">
            <div class="col-lg-8">
              <template v-for="item in itemsInCart" :key="item.title">
                <cart-item :item="item">

                </cart-item>
              </template>
            </div>
            <div class="col-lg-4">
              <div class="cart__form">
                <div class="cart__info">
                  Free shipping from {{ $store.state.cart.freeShippingFrom }}€
                </div>
                <div class="cart__form-container">
                  <div class="text-center">
                    <div class="row">
                      <div class="col text-end">
                        Sub-Total:
                      </div>
                      <div class="col text-start">
                        <span
                            class="cart__form-price">{{
                            itemsPrice > 1 ? itemsPrice.toFixed(2) : itemsPrice.toPrecision(2)
                          }}€</span>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col text-end">
                        Shipping:
                      </div>
                      <div class="col text-start">
                        <span class="cart__form-price">
                          {{ freeShipping ? "Free" : `${$store.state.cart.shippingCost.toFixed(2)}€` }}
                        </span>
                      </div>
                    </div>

                    <div class="row" v-if="couponValue">
                      <div class="col text-end cart__form-price--discount">
                        Discount:
                      </div>
                      <div class="col text-start">
                         <span class="cart__form-price cart__form-price--discount">
                           {{ couponValue }} {{ couponType }}
                         </span>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col text-end fw-bold">
                        Total price:
                      </div>
                      <div class="col text-start">
                         <span class="cart__form-price cart__form-price--total">
                           {{ totalPrice > 1 ? totalPrice.toFixed(2) : totalPrice.toPrecision(2) }}€
                         </span>
                      </div>
                    </div>

                    <div class="row text-start">
                      <div class="col">
                        <input-component v-model="couponCode" placeholder="Coupon code"
                                         icon="ticket"
                                         description="For example: <strong>test</strong> or <strong>abc</strong>"></input-component>
                      </div>
                    </div>

                    <div class="row text-start">
                      <div class="col">
                        <button-component v-show="itemsInCart.length"
                                          class="btn-primary"
                                          icon="bag-check">
                          Buy
                        </button-component>
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

        <button-component v-show="itemsInCart.length"
                          @clickOnButton="openConfirmation()"
                          class="btn-outline-primary"
                          icon="trash">
          Delete cart
        </button-component>

        <Dialog header="are you sure?" v-model:visible="display" :modal="true" :dismissableMask="true">
          <div class="confirmation-content">
            <span>Are you sure you want to proceed?</span>
          </div>
          <template #footer>
            <button-component icon="x-lg" @click="closeConfirmation()" class="btn-outline-secondary">
              No
            </button-component>
            <button-component icon="check-lg" @click="deleteCart()" class="btn-outline-primary" autofocus>
              Yes
            </button-component>
          </template>
        </Dialog>

      </main>
    </template>
  </Transition>
</template>

<script>
import vLoading from "@/components/layout/vLoading.vue";
import CartItem from "@/components/layout/CartItem.vue";
import gsap from "gsap";
import Dialog from 'primevue/dialog';
import {dataAPI} from "../api/api";
import {mapGetters, mapState} from "vuex";


export default {
  name: "Cart",
  data() {
    return {
      loading: true,
      itemsPrice: 0,
      totalPrice: 0,
      display: false,
    }
  },

  components: {
    vLoading,
    CartItem,
    Dialog
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, import.meta.env.VITE_TIMEOUT || 500);

    this.itemsPrice = this.itemsInCartTotalPrice;
    this.totalPrice = this.totalPriceWithShipping;
  },

  computed: {
    ...mapState({
      search: state => state.items.search,
      couponType: state => state.cart.coupon.type,
      couponValue: state => state.cart.coupon.value,
    }),

    ...mapGetters({
      freeShipping: "freeShipping",
      totalPriceWithShipping: "totalPriceWithShipping",
    }),

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

    couponCode: {
      get() {
        return this.$store.state.cart.coupon.code;
      },
      set(value) {
        const coupon = dataAPI.checkCoupon(value);
        if (coupon) {
          if (this.totalPrice < coupon.min_order) {
            this.$store.commit('setCoupon', null);
            this.$toast.add({
              summary: 'Min order for this coupon is ' + coupon.min_order + '€',
              life: 3000,
              group: 'error'
            });
          } else {
            this.$store.commit('setCoupon', coupon);
          }
        } else {
          this.$store.commit('setCoupon', null);
        }
        this.$store.commit('setCouponCode', value);
      }
    }
  },

  methods: {
    openConfirmation() {
      this.display = true;
    },

    closeConfirmation() {
      this.display = false;
    },

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

    couponValue(newValue) {
      if (!newValue) {
        this.couponCode = "";
      }
    }
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
      color: $color-secondary;
    }

    &--discount {
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