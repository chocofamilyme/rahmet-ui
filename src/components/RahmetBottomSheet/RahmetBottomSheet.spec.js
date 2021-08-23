import { mount } from '@vue/test-utils';
import 'regenerator-runtime/runtime';
import RahmetButton from './RahmetBottomSheet.vue';

describe('RahmetBottomSheet.vue', () => {
  let wrapper = null;

  const createWrapper = async (props, slots) => {
    const name = props?.name || 'test';
    const defaultProps = {
      name,
      ...props
    };

    wrapper = mount(RahmetButton, {
      propsData: defaultProps,
      slots,
      global: {
        stubs: {
          transition: false
        }
      }
    });

    await wrapper.vm.onOpen(name);
  };

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('closes the bottom sheet after clicking on background overlay', async () => {
    await createWrapper();

    await wrapper.setData({
      setInnerWidth: 600
    });

    await wrapper.find('.bottom-sheet-overlay').trigger('click');
    expect(wrapper.vm.bottomSheet.activeName).toEqual('');
  });

  it('closes the bottom sheet after dragging the sheet shift', async () => {
    await createWrapper({ shiftMinHeight: 10 });
    await wrapper.setData({
      sheetTouchStarted: true,
      sheetShift: 500
    });
    await wrapper.vm.onSheetTouchEnd();
    expect(wrapper.vm.bottomSheet.activeName).toEqual('');
  });

  it('contains default classes', async () => {
    await createWrapper();

    expect(wrapper.classes()).toContain('bottom-sheet-modal');
    expect(wrapper.find('.blackout').exists()).toBeTruthy();
  });

  it('hides overflow and scroll behavior when the bottom sheet is open', async () => {
    const _props = { name: 'demo' };
    await createWrapper(_props);

    expect(wrapper.vm.bottomSheet.activeName).toEqual(_props.name);
    expect(document.body.style.overflow).toEqual('hidden');
    expect(document.body.style.overscrollBehavior).toEqual('contain');
  });

  it('destroys the bottom sheet and return overflow, and scroll behavior', async () => {
    createWrapper();

    wrapper.vm.onHide();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.bottom-sheet-modal').exists()).toBeFalsy();
    expect(wrapper.vm.bottomSheet.activeName).toEqual('');
    expect(document.body.style.overflow).toEqual('');
    expect(document.body.style.overscrollBehavior).toEqual('auto');
  });
});
