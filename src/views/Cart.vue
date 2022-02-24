<template>
  <template v-if="loading">
    <v-loading></v-loading>
  </template>
  <Transition>
    <template v-if="!loading">
      <main class="container-fluid">
        <h1>Cart</h1>

        <div class="row">
        </div>
      </main>
    </template>
  </Transition>
</template>

<script>
import vLoading from "@/components/layout/vLoading.vue";

export default {
  name: "Cart",
  data() {
    return {
      loading: true,
    }
  },

  components: {
    vLoading,
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, import.meta.env.VITE_TIMEOUT || 500);
  },
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