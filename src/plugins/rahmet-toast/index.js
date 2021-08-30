import { useToast } from './api';

const RahmetToastPlugin = {
  // Adds global $toast instance
  install(app, options) {
    const instance = useToast(options);
    app.config.globalProperties.$toast = instance;
    app.provide('$toast', instance);
  }
};

export default RahmetToastPlugin;
