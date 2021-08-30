<template>
  <Transition :name="transition">
    <div
      v-show="isActive"
      ref="root"
      class="rahmet-toast"
      :class="[`rahmet-toast--${theme}`]"
    >
      <div class="rahmet-toast__icon-wrapper">
        <span
          class="rahmet-toast__icon"
          :class="[`rahmet-toast__icon--${theme}`]"
        ></span>
      </div>

      <div>
        <strong v-if="title" class="rahmet-toast__title">
          {{ title }}
        </strong>

        <p v-if="text" class="rahmet-toast__text">{{ text }}</p>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, render } from 'vue';
import { removeElement } from './RahmetToast.helpers';

export default {
  name: 'RahmetToast',
  props: {
    /**
     * The theme of the toast
     * @values success, warning, error
     */
    theme: {
      type: String,
      default: 'success',
      validator(value) {
        return ['success', 'warning', 'error'].includes(value);
      }
    },
    /**
     * The title of the toast
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * The text of the toast
     */
    text: {
      type: String,
      default: ''
    },
    /**
     * The duration of the toast
     */
    duration: {
      type: Number,
      default: 3000
    },
    /**
     * The transition name of the toast
     */
    transition: {
      type: String,
      default: 'slide-down'
    }
  },
  setup() {
    const root = ref(null);

    return {
      root
    };
  },
  data() {
    return {
      isActive: false,
      parent: null,
      timer: null
    };
  },
  beforeMount() {
    this.setupContainer();
  },
  mounted() {
    this.showNotice();
  },
  methods: {
    /**
     * Gets called before mounting
     */
    setupContainer() {
      this.parent = document.querySelector('.rahmet-toast-container');

      // no need to create the parent, it already exists
      if (this.parent) return;

      if (!this.parent) {
        this.parent = document.createElement('div');
        this.parent.className = 'rahmet-toast-container';
      }

      const container = document.body;
      container.appendChild(this.parent);
    },
    /**
     * Gets called after the timer expires
     */
    dismiss() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.isActive = false;

      // Timeout for the animation complete before unmounting
      setTimeout(() => {
        const wrapper = this.root;
        render(null, wrapper);
        removeElement(wrapper);
      }, 150);
    },
    /**
     * Gets called on mounting
     */
    showNotice() {
      const wrapper = this.root.parentElement;
      this.parent.insertAdjacentElement('afterbegin', this.root);
      removeElement(wrapper);

      this.isActive = true;

      if (this.duration) {
        this.timer = setTimeout(this.dismiss, this.duration);
      }
    }
  }
};
</script>

<style lang="scss">
.rahmet-toast {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 8px;

  &--success {
    background: #22b372;
  }

  &--warning {
    background: #2997ff;
  }

  &--error {
    background: #cc4747;
  }

  &-container {
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 16px;
    overflow: hidden;
    pointer-events: none;
  }

  &__icon {
    display: block;
    width: 36px;
    height: 36px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    &--success {
      background-image: url('~@/assets/icons/toast-success.svg');
    }

    &--warning {
      background-image: url('~@/assets/icons/toast-warning.svg');
    }

    &--error {
      background-image: url('~@/assets/icons/toast-error.svg');
    }

    &-wrapper {
      margin-right: 16px;
    }
  }

  &__title {
    display: block;
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
    color: #fff;
  }

  &__text {
    font-size: 14px;
    line-height: 16px;
    color: #fff;
  }
}

.slide-down {
  &-enter-active,
  &-leave-active {
    transition: all 0.15s ease-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
