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
                  <a :href="item.slug">
                    <div class="cart__image-container">
                      <img :src="item.image" :alt="item.title" class="cart__image">
                    </div>
                  </a>
                  <div class="cart__main">
                    <div class="cart__prices">
                      {{ item.price }}
                    </div>
                    <h4 class="cart__title">{{ item.title }}</h4>
                  </div>
                  <div class="cart__actions">
                    <input type="number" min="1" max="999" :value="getItemCount(item.quantity)"
                           @input="onChangeQuantity($event, item.id)">
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
        <div v-show="itemsInCart.length" class="cart__button cart__button--delete" @click="deleteCart()">
          Delete cart
        </div>
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

  methods: {
    deleteCart() {
      this.$store.dispatch("setLoading", true);
      this.$store.commit('deleteCart');
      this.$store.dispatch("setLoading", false);
    },

    onChangeQuantity(event, itemId) {
      let changedQuantity = +event.target.value;

      if (changedQuantity < 0) {
        changedQuantity = 1;
      }

      this.$store.dispatch("changeQuantityOfItem", {
        id: itemId,
        quantity: changedQuantity,
      });
    },

    getItemCount(quantity) {
      return quantity === 0 ? '' : quantity;
    }
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

.cart {
  &__item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__image-container {
    overflow: hidden;
  }

  &__image {
    width: 225px;
    height: 170px;
    display: block;
    background-color: $background-gray;
    clip-path: $clip-path;
    transition: .2s;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__button {
    cursor: pointer;
    margin-top: 2rem;
  }
}
</style>