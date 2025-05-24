import { defineStore } from 'pinia';

export interface Node {
	id: string;
	type: 'input' | 'output' | 'gate';
	label?: string;
	// You can add more properties as needed
}

export interface Connection {
	from: string; // node id
	to: string; // node id
}

interface State {
	nodes: Node[];
	connections: Connection[];
	// Optionally, track the currently connecting node
	connectingFrom: string | null;
}

export const useLogicStore = defineStore('logic', {
	state: (): State => ({
		nodes: [],
		connections: [],
		connectingFrom: null,
	}),
	actions: {
		addNode(node: Node) {
			if (this.nodes.some((n) => n.id === node.id)) {
				console.warn(`Node with id ${node.id} already exists.`);
				return;
			}
			this.nodes.push(node);
		},
		removeNode(nodeId: string) {
			this.nodes = this.nodes.filter((n) => n.id !== nodeId);
			this.connections = this.connections.filter((c) => c.from !== nodeId && c.to !== nodeId);
		},
		startConnection(fromId: string) {
			this.connectingFrom = fromId;
		},
		finishConnection(toId: string) {
			if (this.connectingFrom && this.connectingFrom !== toId) {
				this.connections.push({ from: this.connectingFrom, to: toId });
			}
			this.connectingFrom = null;
		},
		cancelConnection() {
			this.connectingFrom = null;
		},
		removeConnection(from: string, to: string) {
			this.connections = this.connections.filter((c) => !(c.from === from && c.to === to));
		},
	},
});
