export interface IOControl {
	label?: string;
	active: boolean;
	toggleable?: boolean;
}

export interface Connection {
	in: IOControl;
	out: IOControl;
}
