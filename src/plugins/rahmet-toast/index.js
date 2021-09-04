import { h, render } from 'vue';
import RahmetToast from '@/components/RahmetToast/RahmetToast.vue';

const RahmetToastPlugin = {
  // Adds global $toast instance
  install(app, props) {
    const vNode = h(RahmetToast, props);
    const container = document.body;
    render(vNode, container);

    const ctx = vNode.component.ctx;
    app.config.globalProperties.$toast = ctx;
    app.provide('$toast', ctx);
  }
};

export default RahmetToastPlugin;
