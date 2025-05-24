<template>
	<div class="canvas">
		<slot name="header" />
		<div class="canvas-content">
			<div class="left-side">
				<div class="io-background">
					<div
						class="toggle-control"
						v-for="(control, index) in inputs"
						:key="`left-${index}`"
						:data-node-id="`input-${index}`"
					>
						<ToggleCircle :control="control" @toggle="$emit('toggle', control)" size="XL" />
						<button @mousedown="handleStartConnection(`input-${index}`)">+</button>
					</div>
				</div>
			</div>

			<div class="main-area" @mousemove="handlePreviewMouseMove" @mouseup="handleCancelConnection">
				<svg
					class="connection-svg"
					v-if="connections.length > 0 || connectingFrom"
					:width="'100%'"
					:height="'100%'"
					style="position: absolute; left: 0; top: 0; pointer-events: none; z-index: 1"
				>
					<template v-for="conn in connections" :key="conn.from + '-' + conn.to">
						<ConnectionLine :from="conn.from" :to="conn.to" />
					</template>
					<!-- Draw preview line if connectingFrom is set and previewPos is available -->
					<line
						v-if="connectingFrom && previewPos"
						class="preview-connection"
						:x1="getNodeCenter(connectingFrom)?.x || 0"
						:y1="getNodeCenter(connectingFrom)?.y || 0"
						:x2="previewPos.x"
						:y2="previewPos.y"
						stroke="#aaa"
						stroke-width="2"
						stroke-dasharray="6,4"
					/>
				</svg>
			</div>
			<div class="right-side">
				<div class="io-background">
					<div
						class="toggle-control"
						v-for="(control, index) in outputs"
						:key="`right-${index}`"
						:data-node-id="`output-${index}`"
					>
						<!-- Finish connection on mouseup -->
						<ToggleCircle
							:control="control"
							@toggle="$emit('toggle', control)"
							size="XL"
							@mouseup.stop.prevent="handleFinishConnection(`output-${index}`)"
						/>
					</div>
				</div>
			</div>
		</div>
		<slot name="footer" />
	</div>
</template>

<script setup lang="ts">
import ToggleCircle from '@/components/ToggleCircle.vue';
import ConnectionLine from '@/components/ConnectionLine.vue';

import type { IOControl } from '@/types';
import { useLogicStore } from '@/stores/logic';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const logic = useLogicStore();
const { connections, connectingFrom } = storeToRefs(logic);

const props = defineProps<{
	inputs: IOControl[];
	outputs: IOControl[];
}>();

defineEmits<{
	toggle: [control: IOControl];
}>();

// Register input/output nodes on mount
onMounted(() => {
	props.inputs.forEach((input, i) => {
		logic.addNode({ id: `input-${i}`, type: 'input', label: input.label });
	});
	props.outputs.forEach((output, i) => {
		logic.addNode({ id: `output-${i}`, type: 'output', label: output.label });
	});
});

const previewPos = ref<{ x: number; y: number } | null>(null);

function getNodeCenter(nodeId: string): { x: number; y: number } | null {
	const el = document.querySelector(`[data-node-id='${nodeId}']`);
	if (!el) return null;
	const rect = el.getBoundingClientRect();
	return {
		x: rect.left + rect.width / 2 + window.scrollX,
		y: rect.top + rect.height / 2 + window.scrollY,
	};
}

function handleStartConnection(nodeId: string) {
	console.log('Start connection from', nodeId);
	logic.startConnection(nodeId);
}

function handleFinishConnection(nodeId: string) {
	console.log('Finish connection to', nodeId);
	logic.finishConnection(nodeId);
}

function handlePreviewMouseMove(e: MouseEvent) {
	if (connectingFrom.value) {
		previewPos.value = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY };
	}
}

function handleCancelConnection() {
	console.log('Cancel connection');
	logic.cancelConnection();
	previewPos.value = null;
}
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

.toggle-control {
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	gap: 16px;
}

.left-side .toggle-control {
	align-self: flex-start;
	padding-left: 16px;
}

.right-side .toggle-control {
	align-self: flex-end;
	padding-right: 16px;
}

.main-area {
	flex: 1;
	border: 1px solid var(--border-color);
	margin: 20px 40px;
	border-radius: 4px;
}

.connection-svg {
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	pointer-events: none;
	z-index: 1;
}

.preview-connection {
	pointer-events: none;
	stroke: #aaa;
	stroke-width: 2;
	stroke-dasharray: 6, 4;
}
</style>
