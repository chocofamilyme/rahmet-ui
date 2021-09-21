<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ServeDev',
  data() {
    return {
      inputValue: ''
    };
  },
  methods: {
    openBottomSheet() {
      this.$refs.sheet.onOpen('test');
    },
    openModal() {
      this.$refs.modal.onOpen();
    },
    showToast() {
      this.$toast.warning({
        title: 'Toast',
        text: 'Notification'
      });
    },
    toggleBackdrop() {
      this.$refs.backdrop.onOpen();
      setTimeout(() => {
        this.$refs.backdrop.onHide();
      }, 3000);
    }
  }
});
</script>

<template>
  <div id="app">
    <!-- Input -->
    <h1>Input:</h1>
    <rahmet-input v-model="inputValue" />

    <!-- Spinner -->
    <h1>Spinner:</h1>
    <rahmet-spinner />

    <!-- Bottom Sheet -->
    <h1>Toggle Bottom Sheet:</h1>
    <rahmet-button @click="openBottomSheet" :borderRadius="6" block>
      Toggle Bottom Sheet
    </rahmet-button>
    <rahmet-bottom-sheet name="test" ref="sheet">
      <div>
        <h1 style="height: 50px">Bottom Sheet Text</h1>
        <rahmet-spinner />
      </div>
    </rahmet-bottom-sheet>

    <!-- Modal -->
    <h1>Open Modal:</h1>
    <rahmet-button block theme="secondary" @click="openModal">
      Toggle Modal
    </rahmet-button>
    <rahmet-modal ref="modal">
      <div style="height: 150px">
        <h1>Testing...</h1>
      </div>
    </rahmet-modal>

    <!-- Toast notification -->
    <h1>Show Toast:</h1>
    <rahmet-button @click="showToast">Test</rahmet-button>

    <!-- Backdrop -->
    <rahmet-button block @click="toggleBackdrop">Toggle Backdrop</rahmet-button>
    <RahmetBackdrop ref="backdrop" />
  </div>
</template>
