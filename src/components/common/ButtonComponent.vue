<template>
  <button type="button"
          @click="$emit('clickOnButton')"
          class="btn button-component">
    <i v-if="icon" :class="`bi bi-${icon}`" class="me-1"></i>
    <slot>Ok</slot>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
      required: false,
    },
  },

  name: "ButtonComponent",

  emits: {
    clickOnButton: null,
  }
}
</script>

<style lang="scss" scoped>
.button-component {
  color: $color-text;
  margin: 1rem 1rem .5rem 0;
  padding: 0 2rem;
  min-width: 10rem;
  height: 3.125rem;

  &:hover, &:focus {
    color: #fff;
  }

  @media(max-width: $screen-sm-max) {
    width: 45% !important;
  }

  &.btn-primary{
    color: #fff;
  }
}

.btn-outline-primary {
  &:hover, &:focus {
    background-color: $color-primary;
  }
}

.btn-outline-secondary {
  &:hover, &:focus {
    background-color: $color-secondary;
  }
}
</style>