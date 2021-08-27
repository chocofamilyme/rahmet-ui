<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import {
  RahmetButton,
  RahmetInput,
  RahmetSpinner,
  RahmetBottomSheet,
  RahmetModal
} from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {
    RahmetButton,
    RahmetInput,
    RahmetSpinner,
    RahmetBottomSheet,
    RahmetModal
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
    <rahmet-button @click="openBottomSheet">Toggle Bottom Sheet</rahmet-button>
    <div style="margin-top: 20px"></div>
    <rahmet-bottom-sheet name="test" ref="sheet">
      <div>
        <h1 style="height: 50px">Bottom Sheet Text</h1>
        <rahmet-spinner />
      </div>
    </rahmet-bottom-sheet>
    <rahmet-button @click="$refs.modal.onOpen()">Toggle Modal</rahmet-button>
    <rahmet-modal ref="modal">
      <div style="height: 150px">
        <h1>Testing...</h1>
      </div>
    </rahmet-modal>
  </div>
</template>
