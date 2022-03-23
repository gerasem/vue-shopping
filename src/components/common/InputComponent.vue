<template>
  <div>
    <input type="text"
           :value="modelValue"
           @input="updateInput"
           class="form-control input"
           :class="{'active': modelValue}"
           placeholder="Search ...">

    <template v-if="inputType === 'search'">
      <icon-component :icon="inputType ? 'x-lg' : 'search'"
                      customClass="search-icon"
                      @click="handleClickOnSearchIcon()">
      </icon-component>
    </template>

  </div>
</template>

<script>
export default {
  name: "InputComponent",
  props: {
    inputType: {
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
}
</style>