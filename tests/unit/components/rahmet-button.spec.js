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
});
