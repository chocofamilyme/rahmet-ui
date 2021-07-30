<template>
  <button
    class="rahmet-btn"
    :class="[
      `rahmet-btn--${theme}`,
      { 'rahmet-btn--block': block },
      size !== 'normal' ? `rahmet-btn--${size}` : '',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <!-- @slot Use this slot for default content -->
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "RahmetButton",
  props: {
    /**
     * The theme of the button
     * @values primary, warning, error
     */
    theme: {
      type: String,
      default: "primary",
    },
    /**
     * Extend the full available width
     */
    block: {
      type: Boolean,
      default: false,
    },
    /**
     * The size of the button
     * @values small, normal, large
     */
    size: {
      type: String,
      default: "normal",
    },
    /**
     * Disable the button
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    /**
     * Triggers when the button is clicked
     */
    "click",
  ],
};
</script>

<style lang="scss">
.rahmet-btn {
  min-height: 44px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  color: #fff;
  border: none;
  border-radius: 4px;

  &:disabled {
    color: #8f8f8f;
    background: #dbdbdb;
  }

  &--primary {
    background: #2997ff;
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
    min-height: 32px;
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
}
</style>
