<template>
	<div class="circle-container">
		<div
			class="circle"
			:class="[sizeClass, { active: control.active, toggleable: control.toggleable }]"
			@click="$emit('toggle')"
		/>
		<div v-if="control.label" class="label">{{ control.label }}</div>
	</div>
</template>

<script setup lang="ts">
import type { IOControl } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
	control: IOControl;
	size?: 'XS' | 'S' | 'M' | 'L' | 'XL';
}>();

defineEmits(['toggle']);

const sizeClass = computed(() => {
	switch (props.size) {
		case 'XS':
			return 'circle-xs';
		case 'S':
			return 'circle-s';
		case 'L':
			return 'circle-l';
		case 'XL':
			return 'circle-xl';
		case 'M':
		default:
			return 'circle-m';
	}
});
</script>

<style scoped>
.circle-container {
	--active-color: #3366ff;
	--inactive-color: #333;
	--background-color: var(--inactive-color);
}

.circle-container {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
}

.circle {
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
	display: block;
	position: absolute;
	z-index: 1;
	white-space: nowrap;
	opacity: 0;
	pointer-events: none;
	transition: opacity 200ms ease;
}

.circle-xs {
	width: 16px;
	height: 16px;
}
.circle-s {
	width: 24px;
	height: 24px;
}
.circle-m {
	width: 32px;
	height: 32px;
}
.circle-l {
	width: 40px;
	height: 40px;
}
.circle-xl {
	width: 48px;
	height: 48px;
}

.circle-xs + .label,
.circle-s + .label {
	margin-top: 28px;
}
.circle-m + .label {
	margin-top: 36px;
}
.circle-l + .label {
	margin-top: 44px;
}
.circle-xl + .label {
	margin-top: 52px;
}

.circle-container:hover .label {
	opacity: 1;
	pointer-events: auto;
}
</style>
