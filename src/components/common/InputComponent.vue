<template>
  <div class="input__container">
    <input type="text"
           :value="modelValue"
           @input="updateInput"
           class="form-control input"
           :class="{'active': modelValue}"
           :placeholder="placeholder">

    <template v-if="icon === 'search'">
      <icon-component :icon="modelValue ? 'x-lg' : 'search'"
                      customClass="icon"
                      @click="handleClickOnSearchIcon()">
      </icon-component>
    </template>

    <template v-else>
      <icon-component :icon="icon"
                      customClass="icon"
                      @click="handleClickOnSearchIcon()">
      </icon-component>
    </template>

  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    icon: {
      type: String,
      default: "",
      required: false,
    },

    modelValue: {
      type: [String, Number],
      required: true,
    },

    placeholder: {
      type: String,
      required: false,
    }
  },

  emits: {
    'update:modelValue': null
  },

  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },

    handleClickOnSearchIcon() {
      if (this.modelValue) {
        this.$emit('update:modelValue', "")
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.input {
  border: 0;
  border-bottom: 1px solid #ebebeb;
  border-radius: 0;

  &:hover, &:focus, &.active {
    box-shadow: none;
    border-color: $color-secondary;
  }

  &__container {
    position: relative;
    display: flex;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>