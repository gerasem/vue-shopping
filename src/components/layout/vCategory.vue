<template>
  <Transition name="category">
    <template v-if="!search">
      <div class="container-fluid mb-5">
        <div class="row g-2">
          <div class="col" v-for="category in categories" :key="category">
            <div @click="handleSelectCategory(category)"
                 class="category"
                 :class="getCategoryClass(category.id)">
              <div class="category__image-container">
                <img class="img-fluid category__image" :src="category.image ?? previewImage" :alt="category.title">
              </div>
              <h3 class="category__title">{{ category.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Transition>
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

  methods: {
    handleSelectCategory(category) {
      this.$emit('selectCategory', category);
      this.selectedCategory = category.id;
    },

    getCategoryClass(categoryId) {
      if (!this.selectedCategory) return;
      if (categoryId === this.selectedCategory) return "active";
      return "category--opacity"
    }
  },

  computed: {
    categories() {
      return this.$store.state.categories.categories;
    },

    selectedCategory: {
      get() {
        return this.$store.state.categories.selectedCategory;
      },
      set(value) {
        this.$store.commit('setSelectedCategory', value);
      }
    },

    search() {
      return this.$store.state.items.search;
    }
  },

  emits: {
    selectCategory: null,
  },
}
</script>

<style scoped lang="scss">
.category {
  text-decoration: none;
  cursor: pointer;
  transition: .2s;

  &:hover, &:focus, &.active {
    opacity: 1;

    .category__title {
      color: $color-secondary;
    }

    .category__image {
      transform: scale(1.1);
    }
  }

  &.active {
    .category__image-container {
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
    }
  }

  &__image-container {
    overflow: hidden;
    transition: .2s;
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
  }

  &__title {
    text-align: center;
    transition: .2s;
    color: $color-text;
  }

  &--opacity {
    opacity: .5;
  }
}

.category-leave-to,
.category-enter-active {
  transition: all .3s ease;
}

.category-leave-to,
.category-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
</style>