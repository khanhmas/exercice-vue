import { shallowMount } from '@vue/test-utils';
import FormDishe from '@/components/FormDishe.vue';

describe('FormDishe.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(FormDishe, {
      propsData: {
        action: 'Ajouter'
      }
    });
    expect(wrapper.text()).toContain('Ajouter Plat');
    expect(wrapper.find('.text-h6.heading').exists()).toBe(true);
  })
});
