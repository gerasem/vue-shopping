<template>
  <div class="icon__container"
       :class="{'icon__container--active': count > 0 }"
       @click="$emit('clickOnIcon')">
    <i class="icon bi"
       :class="`bi-${icon} icon--${customClass ?? icon}`">
    </i>

    <span v-if="count"
          class="icon__count"
          :style="minHeightForTotalCount">
                <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "IconComponent",
  props: {
    icon: {
      type: String,
      required: true,
    },

    count: {
      type: Number,
      default: 0,
      required: false,
    },

    customClass: {
      type: String,
      required: false,
    }
  },

  computed: {
    minHeightForTotalCount() {
      return {
        'min-width': this.count.toFixed(0).toString().length + '8' + 'px',
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 1.625rem;
  transition: .2s;
  color: currentColor;

  &--heart {
    &:before {
      vertical-align: -0.2em;
    }
  }

  &--person {
    font-size: 1.75rem;
  }

  &--search-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: $text-muted;
  }

  &--x-lg {
    font-size: 1.5rem;
    color: $text-muted;
    transition: .2s;
    &:hover, &:focus{
      color: $color-primary;
    }
  }

  &--x-lg, &--bag-plus, &--dash-lg, &--plus-lg {
    cursor: pointer;
  }

  &--bag-plus {
    font-size: 1.5rem;
  }

  &__count {
    padding-left: 5px;
    text-align: left;
    color: $color-text;
    transition: .2s;
  }

  &__container {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: $color-icons;

    &:hover, &:focus, &--active {
      color: $color-secondary;
    }

    &:hover, &:focus {
      .icon__count {
        color: $color-secondary;
      }
    }
  }

  &--disabled {
    .icon {
      opacity: .5;
      cursor: not-allowed;
    }
  }
}
</style>