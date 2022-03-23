<template>
  <button type="button"
          @click="$emit('clickOnButton')"
          class="btn button-component">
    <i v-if="icon" :class="`bi bi-${icon}`"></i>
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
  margin: .5rem 0;
  min-width: 6rem;

  &:hover, &:focus {
    color: #fff;
  }

  @media(max-width: $screen-sm-max) {
    width: 45% !important;
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