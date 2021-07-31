import { mount } from "@vue/test-utils";
import RahmetSpinner from "@/components/RahmetSpinner.vue";

describe("RahmetSpinner.vue", () => {
  it("displays color based on prop", () => {
    const wrapper = mount(RahmetSpinner, {
      propsData: {
        color: "orange",
      },
    });

    const spinnerLine = wrapper.find(".rahmet-spinner div");
    expect(spinnerLine.element.style.borderColor).toBe("orange");
  });

  it("checks the size class", () => {
    const wrapper = mount(RahmetSpinner, {
      propsData: {
        size: "large",
      },
    });

    expect(wrapper.classes()).toContain("rahmet-spinner-container--large");
  });
});
