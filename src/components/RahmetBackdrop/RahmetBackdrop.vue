<template>
  <transition name="backdrop">
    <div class="backdrop backdrop__content" v-if="isVisible">
      <div v-if="itHasSlot">
        <slot name="spinner"></slot>
      </div>
      <RahmetSpinner v-else absolute :color="color" :size="size" />
    </div>
  </transition>
</template>

<script>
import RahmetSpinner from '@/components/RahmetSpinner/RahmetSpinner.vue';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export default {
  name: 'RahmetBackdrop',
  components: {
    RahmetSpinner
  },
  props: {
    /**
     * The color of the spinner
     */
    color: {
      type: String,
      default: '#ffffff'
    },
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
  },
  computed: {
    itHasSlot() {
      return !!this.$slots.spinner;
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

.backdrop {
  @include fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  pointer-events: all;
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
    transition: opacity 0.2s ease-out;
  }

  &__content {
    @include fixed;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }
}
</style>
