import { shallowMount } from '@vue/test-utils';
import RahmetToast from './RahmetToast.vue';

describe('RahmetToast.vue', () => {
  let wrapper = null;

  const createWrapper = (props) => {
    const defaultProps = {
      theme: 'success',
      title: 'Success!',
      ...props
    };

    wrapper = shallowMount(RahmetToast, {
      propsData: defaultProps
    });
  };

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('contains the theme class', () => {
    createWrapper();

    const toast = wrapper.find('.rahmet-toast');
    expect(toast.classes()).toContain('rahmet-toast--success');
  });

  it('contains title', () => {
    createWrapper();

    const title = wrapper.find('.rahmet-toast__title');
    expect(title.html()).toContain('Success!');
  });
});
