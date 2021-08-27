import { mount } from '@vue/test-utils';
import 'regenerator-runtime/runtime';
import RahmetModal from './RahmetModal.vue';

describe('RahmetModal.vue', () => {
  let wrapper = null;

  const createWrapper = (props, slots) => {
    const defaultProps = {
      ...props
    };

    wrapper = mount(RahmetModal, {
      propsData: defaultProps,
      slots,
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

  it('opens and closes the modal', () => {
    createWrapper();

    // Open modal
    expect(wrapper.vm.isVisible).toBeFalsy();
    wrapper.vm.onOpen();
    expect(wrapper.vm.isVisible).toBeTruthy();

    // Check overflow
    const $body = document.querySelector('body');
    expect($body.style.overflow).toBe('hidden');

    // Close modal
    window.scrollTo = jest.fn();
    wrapper.vm.onHide();
    expect(wrapper.vm.isVisible).toBeFalsy();
    expect($body.style.overflow).toBe('');
  });

  it('contains main classes', async () => {
    createWrapper();

    await wrapper.vm.onOpen();
    expect(wrapper.classes()).toContain('modal');
    expect(wrapper.find('.modal-pane').exists()).toBeTruthy();
    expect(wrapper.find('.modal-content').exists()).toBeTruthy();
  });

  it('removes border radius of the modal', async () => {
    createWrapper({ rounded: false });
    await wrapper.vm.onOpen();
    expect(wrapper.find('.modal-rounded').exists()).toBeFalsy();
  });

  it('sets width and max-width style property', async () => {
    const _width = 500;
    createWrapper({ width: _width });
    await wrapper.vm.onOpen();
    const modalPane = wrapper.find('.modal-pane').element.style;
    expect(modalPane.width).toBe(_width + 'px');
    expect(modalPane.maxWidth).toBe(_width + 'px');
  });
});
