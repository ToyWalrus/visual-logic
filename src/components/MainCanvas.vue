<template>
	<div class="canvas">
		<slot name="header" />
		<div class="canvas-content">
			<div class="left-side">
				<ToggleCircle
					v-for="(control, index) in inputs"
					:key="`left-${index}`"
					:control="control"
					@toggle="$emit('toggle', control)"
				/>
			</div>
			<div class="main-area" />
			<div class="right-side">
				<ToggleCircle
					v-for="(control, index) in outputs"
					:key="`right-${index}`"
					:control="control"
					@toggle="$emit('toggle', control)"
				/>
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
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	background-color: #fefefe;
}

.canvas-content {
	display: flex;
	flex-direction: row;
	flex: 1;
}

.left-side,
.right-side {
	width: 80px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 40px;
	padding: 20px;
}

.main-area {
	flex: 1;
	border: 1px solid #d4d4d4;
	margin: 20px 0;
	border-radius: 4px;
}
</style>
