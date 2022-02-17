<template>
  <v-category></v-category>
  <main class="container-fluid mt-5">
    <h1>Popular items</h1>
    <div class="row">
      <template v-for="item in 12" :key="item">
        <v-item>

        </v-item>
      </template>
    </div>
  </main>
</template>

<script>
import vCategory from "@/components/layout/vCategory.vue";
import vItem from "@/components/layout/vItem.vue";


export default {
  name: "Home",

  components: {
    vCategory,
    vItem,
  }
}
</script>

<style scoped lang="scss">

</style>