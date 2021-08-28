import { shallowMount } from '@vue/test-utils';
import RahmetSpinner from './RahmetSpinner.vue';

describe('RahmetSpinner.vue', () => {
  let wrapper = null;

  const createWrapper = (props) => {
    const defaultProps = {
      color: 'orange',
      size: 'large',
      ...props
    };

    wrapper = shallowMount(RahmetSpinner, {
      propsData: defaultProps
    });
  };

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('displays color based on prop', () => {
    createWrapper();

    const spinnerLine = wrapper.find('.rahmet-spinner div');
    expect(spinnerLine.element.style.borderColor).toBe('orange');
  });

  it('checks the size class', () => {
    createWrapper();
    expect(wrapper.classes()).toContain('rahmet-spinner-container--large');
  });

  it('sets absolute position vertically and horizontally centered', () => {
    createWrapper({ absolute: true });
    expect(wrapper.classes()).toContain('rahmet-spinner-container--absolute');
  });
});
