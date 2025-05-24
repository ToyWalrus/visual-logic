<template>
	<div class="canvas">
		<slot name="header" />
		<div class="canvas-content">
			<div class="left-side">
				<div class="io-background">
					<ToggleCircle
						v-for="(control, index) in inputs"
						:key="`left-${index}`"
						:control="control"
						@toggle="$emit('toggle', control)"
						size="XL"
					/>
				</div>
			</div>
			<div class="main-area" />
			<div class="right-side">
				<div class="io-background">
					<ToggleCircle
						v-for="(control, index) in inputs"
						:key="`right-${index}`"
						:control="control"
						@toggle="$emit('toggle', control)"
						size="XL"
					/>
				</div>
			</div>
		</div>
		<slot name="footer" />
	</div>
</template>

<script setup lang="ts">
import type { IOControl } from '@/types';
import ToggleCircle from '@/components/ToggleCircle.vue';

defineProps<{
	inputs: IOControl[];
	outputs: IOControl[];
}>();

defineEmits<{
	toggle: [control: IOControl];
}>();
</script>

<style scoped>
.canvas {
	--background-color-rgb: 254, 254, 254;
	--background-color: rgb(var(--background-color-rgb));
	--border-color: rgb(212, 212, 212);
}

@media (prefers-color-scheme: dark) {
	.canvas {
		--border-color: rgb(60, 60, 60);
		--background-color-rgb: 30, 30, 30;
	}
}

.canvas {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	background-color: var(--background-color);
}

.canvas-content {
	display: flex;
	flex-direction: row;
	flex: 1;
}

.io-background {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;

	width: 80px;
	background: radial-gradient(
		circle,
		rgba(var(--background-color-rgb), 1) 75%,
		rgba(var(--background-color-rgb), 0) 100%
	);
	padding: 36px 0;
}

.left-side,
.right-side {
	position: absolute;
	top: 0;
	bottom: 0;

	display: flex;
	flex-direction: column;
	justify-content: center;
}

.left-side {
	left: 0;
}

.right-side {
	right: 0;
}

.main-area {
	flex: 1;
	border: 1px solid var(--border-color);
	margin: 20px 40px;
	border-radius: 4px;
}
</style>
