<template>
  <div
    class="rahmet-spinner-container"
    :class="[
      size !== 'normal' ? `rahmet-spinner-container--${size}` : '',
      { 'rahmet-spinner-container--absolute': absolute }
    ]"
  >
    <div class="rahmet-spinner">
      <div :style="{ borderColor: color }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RahmetSpinner',
  props: {
    /**
     * The size of the spinner
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
     * The color of the spinner
     */
    color: {
      type: String,
      default: '#2997ff'
    },
    /**
     * Absolute centered vertically and horizontally
     */
    absolute: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
@keyframes spinner {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.rahmet-spinner {
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateZ(0) scale(1);
  transform-origin: 0 0;
  backface-visibility: hidden;

  div {
    box-sizing: content-box;
    position: absolute;
    top: 40px;
    left: 40px;
    width: 44px;
    height: 44px;
    border: 4px solid;
    border-top-color: transparent !important;
    border-radius: 50%;
    animation: spinner 1s linear infinite;
  }
}

.rahmet-spinner-container {
  display: block;
  width: 80px;
  height: 80px;
  margin: auto;
  overflow: hidden;

  &--absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &--large {
    width: 120px;
    height: 120px;

    .rahmet-spinner div {
      top: 60px;
      left: 60px;
      width: 66px;
      height: 66px;
      border-width: 5px;
    }
  }

  &--small {
    width: 32px;
    height: 32px;

    .rahmet-spinner div {
      top: 16px;
      left: 16px;
      width: 18px;
      height: 18px;
      border-width: 3px;
    }
  }
}
</style>
