<template>
  <Transition name="slide-down">
    <div class="rahmet-toast" :class="[`rahmet-toast--${theme}`]">
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
    }
  }
};
</script>

<style lang="scss">
.rahmet-toast {
  display: flex;
  align-items: center;
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
    transition: all 0.2s ease-out;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
