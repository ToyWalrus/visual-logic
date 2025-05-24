<template>
	<line
		v-if="fromPos && toPos"
		:x1="fromPos.x"
		:y1="fromPos.y"
		:x2="toPos.x"
		:y2="toPos.y"
		stroke="#4a90e2"
		stroke-width="3"
		marker-end="url(#arrowhead)"
	/>
	<defs>
		<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
			<polygon points="0 0, 10 3.5, 0 7" fill="#4a90e2" />
		</marker>
	</defs>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
	from: string;
	to: string;
}>();

const fromPos = ref<{ x: number; y: number } | null>(null);
const toPos = ref<{ x: number; y: number } | null>(null);

function getNodeCenter(nodeId: string): { x: number; y: number } | null {
	const el = document.querySelector(`[data-node-id='${nodeId}']`);
	if (!el) return null;
	const rect = el.getBoundingClientRect();
	return {
		x: rect.left + rect.width / 2 + window.scrollX,
		y: rect.top + rect.height / 2 + window.scrollY,
	};
}

function updatePositions() {
	fromPos.value = getNodeCenter(props.from);
	toPos.value = getNodeCenter(props.to);
}

onMounted(() => {
	updatePositions();
});

watch(() => [props.from, props.to], updatePositions);
</script>
