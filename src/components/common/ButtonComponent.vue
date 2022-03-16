<template>
  <button type="button"
          @click="$emit('clickOnButton')"
          class="btn btn-outline-primary">
    show all items
  </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  emits: {
    clickOnButton: null,
  }
}
</script>

<style scoped>

</style>