import { mount } from '@vue/test-utils';
import 'regenerator-runtime/runtime';
import RahmetButton from './RahmetBottomSheet.vue';

describe('RahmetBottomSheet.vue', () => {
  let wrapper = null;

  const transitionStub = () => ({
    render: function (h) {
      return this.$options._renderChildren;
    }
  });

  const createWrapper = (props, slots) => {
    const defaultProps = {
      name: 'test',
      ...props
    };

    wrapper = mount(RahmetButton, {
      propsData: defaultProps,
      slots,
      stubs: {
        transition: transitionStub()
      }
    });
  };

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('hides overflow and scroll behavior when the bottom sheet is open', async () => {
    const props = {
      name: 'demo'
    };
    createWrapper(props);

    wrapper.vm.onOpen(props.name);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.bottomSheet.activeName).toEqual(props.name);
    expect(document.body.style.overflow).toEqual('hidden');
    expect(document.body.style.overscrollBehavior).toEqual('contain');
  });

  it('returns overflow and scroll behavior after closing the bottom sheet', async () => {
    createWrapper();
    wrapper.vm.onOpen('test');
    wrapper.vm.onHide();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.bottomSheet.activeName).toEqual('');
    expect(document.body.style.overflow).toEqual('');
    expect(document.body.style.overscrollBehavior).toEqual('auto');
  });
});
