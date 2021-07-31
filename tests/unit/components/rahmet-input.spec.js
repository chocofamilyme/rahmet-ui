import { mount } from "@vue/test-utils";
import RahmetInput from "@/components/RahmetInput.vue";

describe("RahmetInput.vue", () => {
  it("updates the v-model", () => {
    const parent = mount({
      template: '<div><RahmetInput v-model="text"></RahmetInput></div>',
      components: { RahmetInput },
      data() {
        return { text: "Hello" };
      },
    });

    const rahmetInput = parent.find("input");
    rahmetInput.element.value += ", world!";
    rahmetInput.trigger("input");

    expect(parent.vm.text).toBe("Hello, world!");
  });
});
