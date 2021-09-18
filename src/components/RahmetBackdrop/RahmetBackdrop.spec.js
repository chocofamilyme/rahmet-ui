import { mount } from '@vue/test-utils';
import RahmetBackdrop from './RahmetBackdrop.vue';
import 'regenerator-runtime/runtime';

describe('RahmetBackdrop.vue', () => {
  let wrapper = null;

  const createWrapper = (props) => {
    const defaultProps = {
      ...props
    };

    wrapper = mount(RahmetBackdrop, {
      propsData: defaultProps,
      global: {
        stubs: {
          transition: false
        }
      }
    });
  };

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('opens and closes the backdrop', () => {
    createWrapper();

    // Open backdrop
    expect(wrapper.vm.isVisible).toBeFalsy();
    wrapper.vm.onOpen();
    expect(wrapper.vm.isVisible).toBeTruthy();

    // Check overflow
    const $body = document.querySelector('body');
    expect($body.style.overflow).toBe('hidden');

    // Close backdrop
    window.scrollTo = jest.fn();
    wrapper.vm.onHide();
    expect(wrapper.vm.isVisible).toBeFalsy();
    expect($body.style.overflow).toBe('');
  });

  it('contains main classes', async () => {
    createWrapper();

    await wrapper.vm.onOpen();
    expect(wrapper.classes()).toContain('backdrop');
    expect(wrapper.classes()).toContain('backdrop__content');
  });

  it('updates the loading color and size', () => {
    const color = '#000000';
    createWrapper({ color, size: 'small' });
    expect(wrapper.vm.color).toBe(color);
    expect(wrapper.vm.size).toBe('small');
  });
});
