<template>
	<MainCanvas :inputs="inputs" :outputs="outputs" @toggle="toggleInput" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IOControl } from '@/types';
import MainCanvas from '@/components/MainCanvas.vue';

const inputs = ref<IOControl[]>([
	{ label: 'Input 1', active: false, toggleable: true },
	{ label: 'Input 2', active: false, toggleable: true },
]);

const outputs = ref<IOControl[]>([
	{ label: 'Output 1', active: false },
	{ label: 'Output 2', active: false },
]);

const toggleInput = (control: IOControl) => {
	console.log('toggleInput', control);
	control.active = !control.active;
};
</script>
