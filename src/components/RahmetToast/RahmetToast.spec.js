import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import 'regenerator-runtime/runtime';
import RahmetToast from './RahmetToast.vue';

describe('RahmetToast.vue', () => {
  let wrapper = null;

  const createWrapper = (props) => {
    const defaultProps = {
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

  it('toasts contain the theme class', async () => {
    createWrapper();
    wrapper.vm.success();
    await nextTick();

    const successToast = wrapper.find('.rahmet-toast');
    expect(successToast.classes()).toContain('rahmet-toast--success');
  });

  it('toasts contain a title', async () => {
    createWrapper();

    const title = 'Success!';
    wrapper.vm.success({ title });
    await nextTick();

    const successToast = wrapper.find('.rahmet-toast');
    expect(successToast.html()).toContain(title);
  });

  it('toasts contain a text', async () => {
    createWrapper();

    const text = 'Success text!';
    wrapper.vm.success({ text });
    await nextTick();

    const successToast = wrapper.find('.rahmet-toast');
    expect(successToast.html()).toContain(text);
  });

  it('toasts destroy after timeout', async () => {
    jest.useFakeTimers();

    const duration = 5000;
    createWrapper({ duration });
    wrapper.vm.success();
    await nextTick();

    expect(wrapper.vm.toasts.length).toEqual(1);
    expect(wrapper.find('.rahmet-toast').exists()).toBe(true);

    jest.advanceTimersByTime(duration);
    await nextTick();

    expect(wrapper.vm.toasts.length).toEqual(0);
    expect(wrapper.find('.rahmet-toast').exists()).toBe(false);
  });

  it('contain several toasts', async () => {
    createWrapper();
    wrapper.vm.success();
    wrapper.vm.success();
    await nextTick();

    const toastArray = wrapper.findAll('.rahmet-toast');
    expect(toastArray.length).toEqual(2);
  });
});
