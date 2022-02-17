<template>
  <div class="col-md-3 col-sm-6 col-xs-12">
    <div class="item">
      <router-link to="/">
        <div class="item__image-container">
          <img :src="previewImage" alt="" class="img-fluid item__image">
        </div>
      </router-link>
      <div class="item__description">
        <div class="item__price">25 €</div>
        <div class="item__old-price">30 €</div>
        <div class="item__discount">-30%</div>
        <div class="icon__link icon__link--cursor">
          <i class="icon__content icon__content--bag bi bi-bag-plus"></i>
        </div>
      </div>
      <h3 class="item__title">Lorem ipsum</h3>
    </div>
  </div>

</template>

<script>
import imagePlaceholder from '@/assets/images/320x240.png'

export default {
  name: "vItem",

  data() {
    return {
      previewImage: imagePlaceholder,
    }
  },
}
</script>

<style scoped lang="scss">
.item {
  text-decoration: none;
  margin: 25px 0 15px;
  display: block;
  color: $color-text;

  &__image-container {
    overflow: hidden;
  }

  &__image {
    width: 100%;
    clip-path: $clip-path;
    transition: .2s;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__description {
    display: flex;
    flex-direction: row;
    margin: 12px 15px 0;
    font-size: 1rem;
    justify-content: space-between;
  }

  &__price {
    font-weight: 700;
    font-size: 1.125rem;
  }

  &__old-price {
    text-decoration: line-through;
  }

  &__discount {
    color: $color-primary;
  }

  &__title {
    margin: 0 15px;
  }
}
</style>