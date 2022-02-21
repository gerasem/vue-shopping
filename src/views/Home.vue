<template>
  <v-category @selectCategory="onSelectCategory"></v-category>
  <main class="container-fluid mt-5">
    <h1>{{ header }}</h1>
    <div class="row">
      <template v-for="item in filteredItems" :key="item.title">
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
          <a @click="selectedCategory = null" class="btn btn-secondary">show all items</a>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import vCategory from "@/components/layout/vCategory.vue";
import vItem from "@/components/layout/vItem.vue";
import {dataAPI} from "@/api/api.js";

export default {
  name: "Home",

  components: {
    vCategory,
    vItem,
  },

  data() {
    return {
      items: [],
      selectedCategory: null,
      header: "Popular items",
    }
  },

  created() {
    this.items = dataAPI.getPopularItems();
  },

  methods: {
    onSelectCategory(category) {
      this.selectedCategory = category.id;
      this.header = category.title;
    }
  },

  computed: {
    filteredItems() {
      if (this.selectedCategory) {
        return this.items.filter(item => item.category === this.selectedCategory)
      }
      return this.items;
    },
  },
}
</script>

<style scoped lang="scss">

</style>