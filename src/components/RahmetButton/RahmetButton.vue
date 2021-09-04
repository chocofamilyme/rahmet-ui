<template>
  <button
    class="rahmet-btn"
    :class="[
      `rahmet-btn--${theme}`,
      size !== 'normal' ? `rahmet-btn--${size}` : '',
      { 'rahmet-btn--block': block, 'rahmet-btn--loading': loading }
    ]"
    :disabled="disabled || loading"
    :style="{ 'border-radius': borderRadius + 'px', 'font-weight': fontWeight }"
    @click="$emit('click')"
  >
    <span class="rahmet-btn__content" :style="loading ? { opacity: 0 } : {}">
      <!-- @slot Use this slot for default content -->
      <slot></slot>
    </span>

    <Transition name="fade">
      <span v-if="loading" class="rahmet-btn__loader">
        <RahmetSpinner v-if="!hasLoadingSlot" size="small" color="#8f8f8f" />

        <!-- @slot Use this slot for loading content -->
        <slot v-else name="loading"></slot>
      </span>
    </Transition>
  </button>
</template>

<script>
import RahmetSpinner from '@/components/RahmetSpinner/RahmetSpinner.vue';

export default {
  name: 'RahmetButton',
  components: {
    RahmetSpinner
  },
  props: {
    /**
     * The theme of the button
     * @values primary, warning, error
     */
    theme: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'warning', 'error'].includes(value);
      }
    },
    /**
     * Extend the full available width
     */
    block: {
      type: Boolean,
      default: false
    },
    /**
     * The size of the button
     * @values small, normal, large
     */
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['small', 'normal', 'large'].includes(value);
      }
    },
    /**
     * Disable the button
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Show loader
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Set border radius
     */
    borderRadius: {
      type: Number,
      default: 4
    },
    /**
     * Set font weight
     */
    fontWeight: {
      type: String,
      default: '500'
    }
  },
  emits: [
    /**
     * Triggers when the button is clicked
     */
    'click'
  ],
  computed: {
    hasLoadingSlot() {
      return !!this.$slots.loading;
    }
  }
};
</script>

<style lang="scss">
.rahmet-btn {
  position: relative;
  min-height: 44px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  border: none;
  transition: 0.2s;

  &:disabled {
    color: #8f8f8f;
    background: #dbdbdb;
  }

  &--primary {
    background: #2997ff;
  }

  &--secondary {
    background: #f2f2f2;
    color: #2997ff;
  }

  &--warning {
    background: #ffcc30;
  }

  &--error {
    background: #cc4747;
  }

  &--block {
    display: block;
    width: 100%;
  }

  &--small {
    min-height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 18px;
  }

  &--large {
    min-height: 56px;
    padding: 16px 20px;
    font-size: 18px;
    line-height: 24px;
  }

  &__content {
    transition: opacity 0.2s;
  }

  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
