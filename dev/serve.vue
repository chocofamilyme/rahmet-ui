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
    showToast(theme) {
      this.$toast.add({
        title: 'Toast',
        text: 'Notification',
        theme
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
    <rahmet-bottom-sheet name="test" ref="sheet" borderRadius="40">
      <div>
        <h1 style="height: 50px">Bottom Sheet Text</h1>
        <rahmet-input v-model="inputValue" />

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
    <rahmet-button block @click="showToast('success')">Success</rahmet-button>
    <rahmet-button block theme="secondary" @click="showToast('info')">
      Info
    </rahmet-button>
    <rahmet-button block theme="warning" @click="showToast('warning')">
      Warning
    </rahmet-button>
    <rahmet-button block theme="error" @click="showToast('error')">
      Error
    </rahmet-button>

    <!-- Backdrop -->
    <h1>Toggle Backdrop:</h1>
    <rahmet-button block @click="toggleBackdrop">Toggle Backdrop</rahmet-button>
    <RahmetBackdrop ref="backdrop" />
  </div>
</template>
