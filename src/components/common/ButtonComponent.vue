<template>
  <button type="button"
          @click="$emit('clickOnButton')"
          class="btn btn-outline-primary button-component">
    <slot></slot>
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

<style lang="scss" scoped>
  .button-component {
    color: $color-text;
    margin: .5rem 0;
    &:hover, &:focus {
      color: #fff;
    }
  }
</style>