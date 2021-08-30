<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import {
  RahmetButton,
  RahmetInput,
  RahmetSpinner,
  RahmetBottomSheet,
  RahmetToast
} from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {
    RahmetButton,
    RahmetInput,
    RahmetSpinner,
    RahmetBottomSheet,
    RahmetToast
  },
  methods: {
    openBottomSheet() {
      this.$refs.sheet.onOpen('test');
    }
  }
});
</script>

<template>
  <div id="app">
    <h1>Input:</h1>
    <rahmet-input />
    <h1>Spinner:</h1>
    <rahmet-spinner />
    <h1>Toast:</h1>
    <h1>Toggle Bottom Sheet:</h1>
    <rahmet-button @click="openBottomSheet">Test</rahmet-button>
    <rahmet-bottom-sheet name="test" ref="sheet">
      <div>
        <h1 style="height: 50px">Bottom Sheet Text</h1>
        <rahmet-spinner />
      </div>
    </rahmet-bottom-sheet>
    <rahmet-toast />
  </div>
</template>
