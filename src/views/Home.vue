<template>
  <v-category @selectCategory="onSelectCategory"></v-category>

  <template v-if="loading">
    <v-loading></v-loading>
  </template>
  <Transition>
    <template v-if="!loading">
      <main class="container-fluid mt-5">
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
      selectedCategory: null,
      header: "Popular items",
      loading: false,
    }
  },

  created() {
    this.items = dataAPI.getPopularItems();
  },

  methods: {
    onSelectCategory(category) {
      if (this.loading) return;
      if(category.id === this.selectedCategory) return;
      this.selectedCategory = category.id;
      this.loading = true;
      this.header = category.title;
      setTimeout(() => {
        this.loading = false;
      }, this.timeout)
    },

    showPopularItems() {
      if (this.loading) return;
      this.loading = true;
      this.selectedCategory = null;
      this.header = "Popular items";
      setTimeout(() => {
        this.loading = false;
      }, this.timeout)
    }
  },

  computed: {
    filteredItems() {
      if (this.selectedCategory) {
        return dataAPI.getItemsByCategory(this.selectedCategory);
      }
      return this.items;
    },
  },

  inject: [
    'timeout'
  ]
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