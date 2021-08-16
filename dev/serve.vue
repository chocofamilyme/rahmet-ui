<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import {
  RahmetButton,
  RahmetInput,
  RahmetSpinner,
  RahmetToast
} from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {
    RahmetButton,
    RahmetInput,
    RahmetSpinner,
    RahmetToast
  }
});
</script>

<template>
  <div id="app">
    <h1>Button:</h1>
    <rahmet-button>Test</rahmet-button>
    <h1>Input:</h1>
    <rahmet-input />
    <h1>Spinner:</h1>
    <rahmet-spinner />
    <h1>Toast:</h1>
    <rahmet-toast />
  </div>
</template>
