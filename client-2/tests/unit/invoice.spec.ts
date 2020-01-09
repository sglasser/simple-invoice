import { shallowMount } from "@vue/test-utils";
import Invoices from "@/components/Invoices.vue";

describe("Invoices.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Invoices);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});