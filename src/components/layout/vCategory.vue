<template>
  <div class="container-fluid">
    <div class="row g-2">
      <div class="col" v-for="item in 5" :key="item">
        <router-link to="/" class="category__item">
          <div class="category__image-container">
            <img class="img-fluid category__image" :src="previewImage" alt="">
          </div>
          <h3 class="category__title">Lorem ipsum</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import imagePlaceholder from '@/assets/images/320x240.png'

export default {
  props: {},

  components: {},

  data() {
    return {
      previewImage: imagePlaceholder,
    }
  },
}
</script>

<style scoped lang="scss">
.category {
  &__image-container {
    overflow: hidden;

    @media (max-width: $screen-sm-max) {
      min-width: 200px;
    }
    @media (max-width: $screen-xs-max) {
      min-width: 100px;
    }
  }

  &__image {
    width: 100%;
    clip-path: polygon($pol-a 0%, $pol-b 0%, 100% $pol-a, 100% $pol-b, $pol-b 100%, $pol-a 100%, 0% $pol-b, 0% $pol-a);
    transition: .2s;

    &:hover {
      transform: scale(1.05);
    }
  }

  &__title {
    text-align: center;
    transition: .2s;
    color: $color-text;
  }

  &__item {
    text-decoration: none;

    &:hover, &:focus {
      .category__title {
        color: $color-secondary;
      }
    }
  }
}
</style>