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
    createWrapper();

    await wrapper.setData({
      setInnerWidth: 600
    });

    await wrapper.find('.bottom-sheet-overlay').trigger('click');
    expect(wrapper.vm.bottomSheet.activeName).toEqual('');
  });

  it('closes the bottom sheet on mobile touch end', async () => {
    createWrapper();

    wrapper.vm.onBlackoutTouchStart();
    wrapper.vm.onBlackoutTouchEnd();
    expect(wrapper.vm.bottomSheet.activeName).toEqual('');
  });

  it('closes the bottom sheet after dragging the sheet shift', async () => {
    createWrapper({ shiftMinHeight: 10 });
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
    expect(wrapper.find('.sheet-shift').exists()).toBeTruthy();
  });

  it('hides overflow and scroll behavior when the bottom sheet is open', () => {
    const _props = { name: 'demo' };
    createWrapper(_props);

    expect(wrapper.vm.bottomSheet.activeName).toEqual(_props.name);
    expect(document.body.style.overflow).toEqual('hidden');
    expect(document.body.style.overscrollBehavior).toEqual('contain');
  });

  it('destroys the bottom sheet and return overflow, and scroll behavior', () => {
    createWrapper();

    wrapper.vm.onHide();

    expect(wrapper.find('.bottom-sheet-modal').exists()).toBeFalsy();
    expect(wrapper.vm.bottomSheet.activeName).toEqual('');
    expect(document.body.style.overflow).toEqual('');
    expect(document.body.style.overscrollBehavior).toEqual('auto');
  });

  it('changes top border radius corners', async () => {
    const borderRadius = '20';
    await createWrapper({
      borderRadius
    });
    const contentShift = wrapper.find('.sheet-shift');
    expect(contentShift.element.style['border-radius']).toBe(
      `${borderRadius}px ${borderRadius}px 0px 0px`
    );
  });

  it('removes the shift', async () => {
    await createWrapper({
      isShiftVisible: false
    });

    expect(wrapper.find('.shift-content').exists()).toBeFalsy();
  });

  it('checks whether sheet touch move', async () => {
    const _event = {
      changedTouches: [
        {
          clientY: 500
        }
      ]
    };
    createWrapper();

    wrapper.setData({
      sheetTouchStarted: true
    });
    wrapper.vm.onSheetTouchMove(_event);
    expect(wrapper.vm.sheetShift).toBeGreaterThan(0);
  });
});
