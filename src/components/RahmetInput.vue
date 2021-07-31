<template>
  <div class="rahmet-input-container">
    <input
      v-model="value"
      type="text"
      class="rahmet-input"
      :placeholder="placeholder"
      :disabled="disabled"
    />

    <!-- @slot Use this slot for icon content -->
    <slot name="icon"></slot>
  </div>
</template>

<script>
export default {
  name: "RahmetInput",
  props: {
    /**
     * @model
     */
    modelValue: {
      type: String,
      required: true,
    },
    /**
     * The placeholder of the input
     */
    placeholder: {
      type: String,
      default: "Введите значение",
    },
    /**
     * Disable the input
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    /**
     * Triggers when the model changes
     */
    "update:modelValue",
  ],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style lang="scss">
.rahmet-input {
  width: 100%;
  padding: 0 12px;
  font-size: 16px;
  line-height: 20px;
  color: #131113;
  border: none;

  &::placeholder {
    color: #dbdbdb;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: #f7f7f7;
  }

  &-container {
    display: flex;
    height: 40px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
  }
}
</style>
