import RahmetToast from '@/components/RahmetToast/RahmetToast.vue';
import { createComponent } from '@/components/RahmetToast/RahmetToast.helpers.js';

export const useToast = () => {
  return {
    /**
     * Opens toast component
     *
     * @param { Object } props Component props
     */
    open(props) {
      createComponent(RahmetToast, props, document.body);
    }
  };
};
