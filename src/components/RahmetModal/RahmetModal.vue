<template>
  <transition name="modal">
    <div class="modal" v-if="isVisible">
      <div
        class="modal-pane"
        :class="{ 'modal-rounded': rounded }"
        :style="{ width: width + 'px', 'max-width': width + 'px' }"
      >
        <div
          class="modal-content"
          :class="{ 'modal-content-padding': contentPadding }"
        >
          <slot></slot>
        </div>
      </div>
      <div
        class="modal-overlay"
        v-on="confirmable ? {} : { click: onHide }"
      ></div>
    </div>
  </transition>
</template>

<script>
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export default {
  name: 'RahmetModal',
  props: {
    /**
     * Rounded corners
     */
    rounded: {
      type: Boolean,
      default: true
    },
    /**
     * Inside content padding
     */
    contentPadding: {
      type: Boolean,
      default: true
    },
    /**
     * Whether to disable close event by clicking outside of the modal
     */
    confirmable: {
      type: Boolean,
      default: false
    },
    /**
     * Max width of the modal
     */
    width: {
      type: Number,
      default: 328
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    onOpen() {
      this.isVisible = true;
      disablePageScroll();
    },
    onHide() {
      this.isVisible = false;
      enablePageScroll();
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin fixed {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
}

.modal {
  @include fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  pointer-events: none;
  overflow: auto;

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
  }

  &-enter-active {
    transition: opacity 0.2s ease-out;
  }

  &-leave-active {
    transition: opacity 0.2s;
  }

  &-content {
    height: 100%;
    overflow-y: auto;
    background-color: #ffffff;

    &-padding {
      padding: 16px;
    }
  }

  &-pane {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 1000;
    max-height: 90%;
    pointer-events: all;
    z-index: 2;
  }

  &-overlay {
    @include fixed;
    pointer-events: all;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  &-rounded {
    border-radius: 15px;
  }
}
</style>
