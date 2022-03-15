<template>
  <div class="cart__item">
    <a :href="item.slug">
      <div class="cart__image-container">
        <img :src="item.image" :alt="item.title" class="cart__image">
      </div>
    </a>
    <div class="cart__main">
      <div class="cart__prices">
        <div class="cart__price">{{ item.price }}€</div>
        <div class="cart__old-price" v-if="item.old_price">{{ item.old_price }}€</div>
        <div class="cart__discount" v-if="getSale">{{ getSale }}%</div>
      </div>
      <h4 class="cart__title">{{ item.title }}</h4>
    </div>
    <div class="cart__actions">
      <div class="icon__link icon__link--cart icon--cursor"
           :class="{'icon__link--disabled': item.quantity <= 1}"
           @click="decrementCount()">
        <i class="icon__content bi bi-dash-lg"></i>
      </div>
      <input type="text" class="cart__input" :value="getItemCount"
             @input="onChangeQuantity($event, item.id)">
      <div class="icon__link icon__link--cart icon--cursor"
           :class="{'icon__link--disabled': item.quantity >= $options.maxCount}"
           @click="incrementCount()">
        <i class="icon__content bi bi-plus-lg"></i>
      </div>
    </div>
    <div class="icon__link icon--cursor" @click="deleteItem()">
      <i class="icon__content bi bi-x-lg"></i>
    </div>
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

    incrementCount() {
      if (this.item.quantity >= this.$options.maxCount) {
        //todo add toast message
        return;
      }
      this.item.quantity++;
    },

    decrementCount() {
      if (this.item.quantity <= 1) {
        //todo add toast message
        return;
      }
      this.item.quantity--;
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
    margin: 20px 0;
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
    --pol-a: 10px;
    --pol-b: calc(100% - var(--pol-a));

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