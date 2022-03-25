<template>
  <div class="input__field" :class="{'input__field--onlyUnderline': onlyUnderline}">
    <div class="input__container">
      <input type="text"
             :value="modelValue"
             @input="updateInput"
             @blur="handleOnBlur"
             @keydown.enter="handleOnBlur"
             class="form-control input"
             :class="{'active': modelValue}"
             :placeholder="placeholder">

      <template v-if="icon === 'search'">
        <icon-component :icon="modelValue ? 'x-lg' : 'search'"
                        customClass="icon"
                        @click="handleClickOnIcon">
        </icon-component>
      </template>

      <template v-else>
        <icon-component :icon="icon"
                        customClass="icon"
                        @click="handleClickOnIcon">
        </icon-component>
      </template>
    </div>
    <div id="emailHelp" class="form-text input__description" v-if="description" v-html="description"></div>
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
    },

    description: {
      type: String,
      required: false,
    },

    onlyUnderline: {
      type: Boolean,
      default: false,
    }
  },

  emits: {
    'update:modelValue': null
  },

  methods: {
    updateInput(event) {
      if (this.icon === "search") {
        this.$emit('update:modelValue', event.target.value);
      }
      //
      // if (this.icon === "ticket" && event.target.value === "") {
      //   this.$emit('update:modelValue', "");
      // }
    },

    handleClickOnIcon() {
      if (this.icon === "search" && this.modelValue) {
        this.$emit('update:modelValue', "");
      }
    },

    handleOnBlur(event) {
      if (this.icon === "ticket") {
        this.$emit('update:modelValue', event.target.value.trim().toLowerCase());
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  height: 3.125rem;

  &:hover, &:focus, &.active {
    box-shadow: none;
    border-color: $color-secondary;
  }

  &__container {
    position: relative;
    display: flex;
  }

  &__field {
    display: inline-flex;
    width: 100%;
    flex-direction: column;
    margin-top: 1rem;

    &--onlyUnderline {
      margin-top: 0;
      margin-left: 1rem;
      margin-right: 1rem;
      width: auto;

      & .input {
        border: 0;
        border-bottom: 1px solid $border-color;
      }
    }
  }

  &__description {
    margin-top: 0;
    text-align: left;
  }
}
</style>