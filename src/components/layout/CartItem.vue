<template>
  <div class="cart__item">
    <router-link :to="item.slug">
      <div class="cart__image-container">
        <img :src="item.image" :alt="item.title" class="cart__image">
      </div>
    </router-link>
    <div class="cart__main">
      <div class="cart__prices">
        <div class="cart__price">{{ item.price }}€</div>
        <div class="cart__old-price" v-if="item.old_price">{{ item.old_price }}€</div>
        <div class="cart__discount" v-if="getSale">{{ getSale }}%</div>
      </div>
      <h4 class="cart__title">{{ item.title }}</h4>
    </div>
    <div class="cart__actions">
      <icon-component icon="dash-lg"
                      :class="{'icon--disabled': item.quantity <= 1}"
                      @clickOnIcon="decrementCount()">
      </icon-component>

      <input type="text" class="cart__input" :value="getItemCount"
             @input="onChangeQuantity($event)">

      <icon-component icon="plus-lg"
                      :class="{'icon--disabled': item.quantity >= $options.maxCount}"
                      @clickOnIcon="incrementCount()">
      </icon-component>
    </div>

    <icon-component icon="x-lg"
                    class="ms-3"
                    @clickOnIcon="deleteItem()">
    </icon-component>
  </div>
</template>

<script>

export default {

  data() {
    return {}
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    getSale() {
      if (!this.item.old_price) return;
      return ((this.item.price / this.item.old_price - 1) * 100).toFixed(0);
    },

    getItemCount() {
      return this.item.quantity === 0 ? '' : this.item.quantity;
    },
  },

  methods: {
    deleteItem() {
      this.$store.dispatch("handleOnDeleteItem", this.item);
    },

    onChangeQuantity(event) {
      let changedQuantity = +event.target.value;

      if (changedQuantity < 0) {
        changedQuantity = 1;
      }

      this.$store.dispatch("changeQuantityOfItem", {
        id: this.item.id,
        quantity: changedQuantity,
      });
    },

    incrementCount() {
      if (this.item.quantity >= this.$options.maxCount) {
        //todo add toast message
        return;
      }
      this.item.quantity++;
      this.$store.dispatch("changeQuantityOfItem", {
        id: this.item.id,
        quantity: this.item.quantity,
      });
    },

    decrementCount() {
      if (this.item.quantity <= 1) {
        //todo add toast message
        return;
      }
      this.item.quantity--;
      this.$store.dispatch("changeQuantityOfItem", {
        id: this.item.id,
        quantity: this.item.quantity,
      });
    }
  },

  maxCount: 999,
}
</script>

<style scoped lang="scss">
.cart {
  &__item {
    display: flex;
    align-items: center;
    padding: 1rem 1rem 1rem 0;
    position: relative;

    &:not(:last-of-type):after {
      position: absolute;
      content: "";
      width: calc(100% - 2rem);
      left: 1rem;
      bottom: 0;
      height: 1px;
      background: $color-separator;
    }
  }

  &__image-container {
    overflow: hidden;
  }

  &__image {
    width: 200px;
    height: 150px;
    object-fit: cover;
    display: block;
    background-color: $background-gray;
    clip-path: $clip-path;
    transition: .2s;
    --pol-a: 10px;
    --pol-b: calc(100% - var(--pol-a));

    @media(max-width: $screen-lg-max) {
      width: 130px;
      height: 100px;
    }

    @media(max-width: $screen-md-max) {
      width: 100px;
      height: 75px;
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  &__button {
    cursor: pointer;
    margin-top: 2rem;
  }

  &__main {
    flex: 1;
    margin: 0 2rem;
  }

  &__prices {
    display: flex;
  }

  &__price {
    font-size: 1.125rem;
    font-weight: 600;
  }

  &__old-price {
    text-decoration: line-through;
    margin: 0 2rem;
  }

  &__discount {
    color: $color-primary;
  }

  &__title {
    font-size: 1rem;
  }

  &__actions {
    display: flex;
  }

  &__input {
    border: none;
    text-align: center;
    max-width: 3rem;
  }
}
</style>