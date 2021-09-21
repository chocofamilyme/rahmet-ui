<template>
  <div class="rahmet-toast-container">
    <TransitionGroup :name="transition">
      <div
        v-for="toast in toasts"
        :key="toast.key"
        class="rahmet-toast"
        :class="[`rahmet-toast--${toast.theme}`]"
        @click="remove(toast)"
      >
        <div class="rahmet-toast__icon-wrapper">
          <span
            class="rahmet-toast__icon"
            :class="[`rahmet-toast__icon--${toast.theme}`]"
            :style="
              toast.icon ? { backgroundImage: `url('${toast.icon}')` } : {}
            "
          ></span>
        </div>

        <div>
          <strong v-if="toast.title" class="rahmet-toast__title">
            {{ toast.title }}
          </strong>

          <p v-if="toast.text" class="rahmet-toast__text">{{ toast.text }}</p>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  name: 'RahmetToast',
  props: {
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
  data() {
    return {
      toasts: []
    };
  },
  methods: {
    /**
     * Adds toast
     */
    add(options = {}) {
      if (!['success', 'info', 'warning', 'error'].includes(options.theme)) {
        return;
      }

      const toast = {
        theme: options.theme,
        title: options.title,
        text: options.text,
        icon: options.icon,
        key: `${Date.now()}-${Math.random()}`
      };

      this.toasts.push(toast);
      setTimeout(() => this.remove(toast), options.duration || this.duration);
    },
    /**
     * Removes toast
     */
    remove(toast) {
      let i = this.toasts.indexOf(toast);

      if (i >= 0) {
        this.toasts.splice(i, 1);
      }
    },
    /**
     * Adds success toast
     */
    success(options = {}) {
      this.add({ ...options, theme: 'success' });
    },
    /**
     * Adds info toast
     */
    info(options = {}) {
      this.add({ ...options, theme: 'info' });
    },
    /**
     * Adds warning toast
     */
    warning(options = {}) {
      this.add({ ...options, theme: 'warning' });
    },
    /**
     * Adds error toast
     */
    error(options = {}) {
      this.add({ ...options, theme: 'error' });
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
  pointer-events: visible;

  &--success {
    background: #22b372;
  }

  &--info {
    background: #2997ff;
  }

  &--warning {
    background: #ff9d53;
  }

  &--error {
    background: #cc4747;
  }

  &-container {
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
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
      background-image: url('../../assets/icons/toast-success.svg');
    }

    &--info {
      background-image: url('../../assets/icons/toast-info.svg');
    }

    &--warning {
      background-image: url('../../assets/icons/toast-warning.svg');
    }

    &--error {
      background-image: url('../../assets/icons/toast-error.svg');
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
    transition-property: transform, opacity;
    transition-duration: 150ms;
    transition-timing-function: ease-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
