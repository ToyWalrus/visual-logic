<template>
	<div class="circle-container">
		<div
			class="circle"
			:class="{ active: control.active, toggleable: control.toggleable }"
			@click="$emit('toggle')"
		></div>
		<div v-if="control.label" class="label">{{ control.label }}</div>
	</div>
</template>

<script setup lang="ts">
import type { IOControl } from '@/types';

defineProps<{
	control: IOControl;
}>();

defineEmits(['toggle']);
</script>

<style scoped>
.circle-container {
	--active-color: #3366ff;
	--inactive-color: #333;
	--background-color: var(--inactive-color);
}

.circle-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
}

.circle {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background-color: var(--background-color);
	transition: background-color 200ms ease;
}

.circle:not(.toggleable) {
	pointer-events: none;
}

.circle.toggleable {
	cursor: pointer;
}

.circle.active {
	--background-color: var(--active-color);
}

.label {
	font-size: 12px;
	padding: 2px 4px;
	background-color: var(--inactive-color);
	border-radius: 4px;
	color: #fff;
}
</style>
