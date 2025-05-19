import { mount } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('HelloWorld', () => {
	beforeAll(() => {
		setActivePinia(createPinia());
	});

	test('renders properly', () => {
		const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } });
		expect(wrapper.text()).toContain('Hello Vitest');
	});
});
