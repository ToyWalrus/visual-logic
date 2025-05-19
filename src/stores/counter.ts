import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
	const count = ref(0);
	const doubleCount = computed(() => count.value * 2);
	const increment = () => {
		count.value++;
	};

	return { count, doubleCount, increment };
});

export const useCounterStore2 = defineStore('counter2', {
	state: () => ({ count: 0 }),
	getters: {
		doubleCount: (state) => state.count * 2,
	},
	actions: {
		increment() {
			this.count++;
		},
	},
});
