<template>
  <v-category></v-category>
  <main class="container-fluid mt-5">
    <h1>Popular items</h1>
    <div class="row">
      <template v-for="item in items" :key="item.title">
        <v-item :item="item">

        </v-item>
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
      items: []
    }
  },

  created() {
    this.items = dataAPI.getPopularItems();
  }
}
</script>

<style scoped lang="scss">

</style>