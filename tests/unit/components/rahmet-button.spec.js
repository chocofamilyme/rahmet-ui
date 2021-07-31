import { mount } from "@vue/test-utils";
import RahmetButton from "@/components/RahmetButton.vue";

describe("RahmetButton.vue", () => {
  it("contains classes based on props", () => {
    const wrapper = mount(RahmetButton, {
      propsData: {
        theme: "error",
        block: true,
        size: "large",
      },
    });

    expect(wrapper.classes()).toContain("rahmet-btn--error");
    expect(wrapper.classes()).toContain("rahmet-btn--block");
    expect(wrapper.classes()).toContain("rahmet-btn--large");
  });

  it("displays loader properly", () => {
    const wrapper = mount(RahmetButton, {
      propsData: {
        loading: true,
      },
    });

    const btnContent = wrapper.find(".rahmet-btn__content");
    const loader = wrapper.find(".rahmet-btn__loader");

    expect(wrapper.classes()).toContain("rahmet-btn--loading");
    expect(btnContent.isVisible()).toBe(false);
    expect(loader.exists()).toBe(true);
  });

  it("displays loading slot properly", () => {
    const wrapper = mount(RahmetButton, {
      propsData: {
        loading: true,
      },
      slots: {
        loading: '...'
      }
    });

    const loader = wrapper.find(".rahmet-btn__loader");
    const loaderSpinner = wrapper.findComponent({name: 'RahmetSpinner'})

    expect(loader.html()).toContain('...')
    expect(loaderSpinner.exists()).toBe(false);
  })
});
