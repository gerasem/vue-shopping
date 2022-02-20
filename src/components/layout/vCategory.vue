<template>
  <div class="container-fluid">
    <div class="row g-2">
      <div class="col" v-for="category in categories" :key="category">
        <router-link :to="`/category/${category.slug}`" class="category">
          <div class="category__image-container">
            <img class="img-fluid category__image" :src="category.image ?? previewImage" :alt="category.title">
          </div>
          <h3 class="category__title">{{ category.title }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import imagePlaceholder from '@/assets/images/320x240.png'
import {dataAPI} from "@/api/api.js";

export default {
  props: {},

  components: {},

  data() {
    return {
      previewImage: imagePlaceholder,
      categories: [],
    }
  },

  created() {
    this.categories = dataAPI.getCategories();
  }
}
</script>

<style scoped lang="scss">
.category {
  text-decoration: none;

  &:hover, &:focus {
    .category__title {
      color: $color-secondary;
    }
  }

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
    clip-path: $clip-path;
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
}
</style>