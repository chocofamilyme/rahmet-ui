import RahmetToast from './RahmetToast.vue';
import { createComponent } from './helpers.js';

export const useToast = () => {
  return {
    open(options) {
      const instance = createComponent(RahmetToast, options, document.body);

      return {
        dismiss: instance.ctx.dismiss
      };
    }
  };
};
