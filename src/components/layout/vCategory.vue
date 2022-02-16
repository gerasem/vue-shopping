<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col" v-for="item in 5" :key="item">
        <img class="img-fluid category__image" :src="previewImage" alt="">
        <h3 class="text-center">Lorem ipsum</h3>
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
.category{
  &__image{
    width: 100%;
  }
}
</style>