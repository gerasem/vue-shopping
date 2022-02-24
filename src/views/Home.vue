<template>
  <v-category @selectCategory="onSelectCategory"></v-category>
  <template v-if="loading">
    <v-loading></v-loading>
  </template>
  <Transition>
    <template v-if="!loading">
      <main class="container-fluid">
        <h1>{{ header }}</h1>

        <div class="row">
          <template v-for="item in filteredItems" :key="item.id">
            <v-item :item="item">

            </v-item>
          </template>
          <template v-if="!filteredItems.length">
            <div class="col">
              Items not found
            </div>
          </template>
          <template v-if="selectedCategory">
            <div class="w-100"></div>
            <div class="col">
              <a @click="showPopularItems()" class="btn btn-secondary">show all items</a>
            </div>
          </template>
        </div>
      </main>
    </template>
  </Transition>
</template>

<script>
import vCategory from "@/components/layout/vCategory.vue";
import vItem from "@/components/layout/vItem.vue";
import vLoading from "@/components/layout/vLoading.vue";
import {dataAPI} from "@/api/api.js";

export default {
  name: "Home",

  components: {
    vCategory,
    vItem,
    vLoading
  },

  data() {
    return {
      items: [],
      header: "",
      loading: true,
    }
  },

  created() {
    if (!this.items.length) {
      this.items = dataAPI.getPopularItems();
      setTimeout(() => {
        this.loading = false;
      }, import.meta.env.VITE_TIMEOUT || 500);
    }
    this.changeHeader();
  },

  methods: {
    onSelectCategory(category) {
      if (this.loading) return;
      // console.log(category.id, this.selectedCategory);
      if (category.id === this.selectedCategory) return;
      this.selectedCategory = category.id;
      this.loading = true;
      this.header = category.title;
      setTimeout(() => {
        this.loading = false;
      }, import.meta.env.VITE_TIMEOUT || 500);
    },

    showPopularItems() {
      if (this.loading) return;
      this.loading = true;
      this.selectedCategory = null;
      this.header = this.$options.popularItems;
      setTimeout(() => {
        this.loading = false;
      }, import.meta.env.VITE_TIMEOUT || 500);
    },

    changeHeader() {
      this.header = this.search.length > 0 ? "Search..." : this.$options.popularItems;
    }
  },

  computed: {
    search() {
      return this.$store.state.items.search;
    },

    filteredItems() {
      if (this.search) {
        return this.items.filter(search => search.title.toLowerCase().includes(this.search.toLowerCase()));
      }
      if (this.selectedCategory) {
        return dataAPI.getItemsByCategory(this.selectedCategory);
      }
      return this.items;
    },

    selectedCategory: {
      get() {
        return this.$store.state.items.selectedCategory;
      },
      set(value) {
        this.$store.commit('setSelectedCategory', value);
      }
    },
  },

  popularItems: "Popular items",

  watch: {
    search(newValue, oldValue) {
      this.changeHeader();
      if (this.search.length > 0 && this.search.length <= 1 && oldValue <= 2) {
        this.loading = true;
        this.selectedCategory = null;
        setTimeout(() => {
          this.loading = false;
        }, import.meta.env.VITE_TIMEOUT || 500);
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
</style>