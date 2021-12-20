<template>
  <transition name="bottom-sheet">
    <div v-if="bottomSheet.activeName === name" class="bottom-sheet-modal">
      <div
        class="blackout"
        :class="{ 'bottom-sheet-overlay': overlay }"
        @touchstart.passive="onBlackoutTouchStart"
        @touchend="onBlackoutTouchEnd"
        v-on="innerWidth >= 550 ? { click: onHide } : {}"
      ></div>
      <div class="sheet" style="max-height: 95%">
        <div
          :style="{
            transform: `translateY(${sheetShift}px)`,
            borderRadius: `${borderRadius}px ${borderRadius}px 0px 0px`
          }"
          class="sheet-shift"
          role="dialog"
          aria-modal="true"
          @touchstart.passive="onSheetTouchStart"
          @touchmove.passive="onSheetTouchMove"
          @touchend="onSheetTouchEnd"
        >
          <div class="shift-content" @click="onHide" v-if="isShiftVisible">
            <div :style="{ 'background-color': shiftColor }"></div>
          </div>
          <div
            ref="content"
            class="bottom-sheet-content"
            :class="{
              'bottom-sheet-content-padding': contentPadding
            }"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const extractTouch = (e) => e.changedTouches[0].clientY;
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export default {
  name: 'RahmetBottomSheet',
  props: {
    /**
     * The name of the button sheet
     * Note: must be the same parameter in onOpen()
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Rounded top corners
     */
    borderRadius: {
      type: String,
      default: '15'
    },
    /**
     * Background overlay
     */
    overlay: {
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
     * Minimum height to close the bottom sheet by dragging
     */
    shiftMinHeight: {
      type: Number,
      default: 70
    },
    /**
     * Color of the sheet shift
     */
    shiftColor: {
      type: String,
      default: '#e0e0e0'
    },
    /**
     * Shift visibility
     */
    isShiftVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      blackoutTouchStarted: false,
      sheetTouchStarted: false,
      sheetTouchStart: 0,
      sheetShift: 0,
      bottomSheet: {
        activeName: ''
      },
      innerWidth: window.innerWidth
    };
  },
  watch: {
    'bottomSheet.activeName': function onStateChange(newValue, prevValue) {
      if (newValue === '' && prevValue === this.name) {
        this.$emit('onClose');
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.setInnerWidth);
  },
  beforeUnmount() {
    if (this.bottomSheet.activeName === this.name) {
      this.onHide();
    }
  },
  unmounted() {
    window.removeEventListener('resize', this.setInnerWidth);
  },
  methods: {
    setInnerWidth() {
      this.innerWidth = window.innerWidth;
    },
    onOpen(name) {
      this.bottomSheet.activeName = name;
      document.body.style.overscrollBehavior = 'contain';
      disablePageScroll();
    },
    onHide() {
      this.bottomSheet.activeName = '';
      enablePageScroll();
      document.body.style.overscrollBehavior = 'auto';
    },
    onBlackoutTouchStart() {
      this.blackoutTouchStarted = true;
    },
    onBlackoutTouchEnd() {
      if (this.blackoutTouchStarted) {
        this.blackoutTouchStarted = false;
        this.onHide();
      }
    },
    onSheetTouchStart(e) {
      this.sheetTouchStarted = this.$refs.content.scrollTop === 0;
      this.sheetTouchStart = extractTouch(e);
    },
    onSheetTouchMove(e) {
      if (this.sheetTouchStarted) {
        const shift = extractTouch(e) - this.sheetTouchStart;
        this.sheetShift = Math.max(0, shift);
      }
    },
    onSheetTouchEnd() {
      const shift = parseInt(this.sheetShift, 10);

      if (this.sheetTouchStarted && shift >= this.shiftMinHeight) {
        this.onHide();
      }

      this.sheetTouchStarted = false;
      this.sheetShift = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin inset-0 {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
}

.z-9999 {
  z-index: 9999;
}

.blackout {
  @include inset-0;
  @extend .z-9999;
}

.sheet {
  @extend .z-9999;
  display: flex;
  position: absolute;
  bottom: 0px;
  width: 100%;

  &-shift {
    display: flex;
    flex-direction: column;
    width: 100%;
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
    overflow: hidden;
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transition-duration: 300ms;
  }
}

.shift-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 100%;

  div {
    margin-top: 14px;
    margin-bottom: 14px;
    height: 5px;
    width: 46px;
    border-radius: 0.25rem;
  }
}

.bottom-sheet {
  &-enter-active,
  &-leave-active {
    transition: 500ms;
  }

  &-enter-active > .blackout,
  &-leave-active > .blackout {
    transition: 500ms;
  }
  &-enter-from > .blackout,
  &-leave-to > .blackout {
    opacity: 0;
  }

  &-enter-active > .sheet,
  &-leave-active > .sheet {
    transition: 200ms ease-in;
  }
  &-enter-from > .sheet,
  &-leave-to > .sheet {
    transform: translateY(100%);
  }

  &-overlay {
    background: #000000;
    opacity: 0.7;
  }

  &-modal {
    @include inset-0;
    @extend .z-9999;
    display: flex;
  }

  &-content {
    max-height: 100vh;
    overflow: scroll;
    overscroll-behavior: none;
  }

  &-content-padding {
    padding: 0px 16px 16px 16px;
  }
}
</style>
