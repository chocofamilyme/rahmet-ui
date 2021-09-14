import { mount } from '@vue/test-utils';
import RahmetOverlay from './RahmetOverlay.vue';
import 'regenerator-runtime/runtime';

describe('RahmetSpinner.vue', () => {
  let wrapper = null;

  const createWrapper = (props) => {
    const defaultProps = {
      ...props
    };

    wrapper = mount(RahmetOverlay, {
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

  it('opens and closes the overlay', () => {
    createWrapper();

    // Open overlay
    expect(wrapper.vm.isVisible).toBeFalsy();
    wrapper.vm.onOpen();
    expect(wrapper.vm.isVisible).toBeTruthy();

    // Check overflow
    const $body = document.querySelector('body');
    expect($body.style.overflow).toBe('hidden');

    // Close overlay
    window.scrollTo = jest.fn();
    wrapper.vm.onHide();
    expect(wrapper.vm.isVisible).toBeFalsy();
    expect($body.style.overflow).toBe('');
  });

  it('contains main classes', async () => {
    createWrapper();

    await wrapper.vm.onOpen();
    expect(wrapper.classes()).toContain('overlay');
    expect(wrapper.classes()).toContain('overlay__content');
  });

  it('updates the loading color and size', () => {
    const color = '#000000';
    createWrapper({ color, size: 'small' });
    expect(wrapper.vm.color).toBe(color);
    expect(wrapper.vm.size).toBe('small');
  });
});
