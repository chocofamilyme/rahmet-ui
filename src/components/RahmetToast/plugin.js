import { useToast } from './js/api';

const RahmetToastPlugin = {
  install(app, options) {
    const instance = useToast(options);
    app.config.globalProperties.$toast = instance;
    app.provide('$toast', instance);
  }
};

export default RahmetToastPlugin;
