interface NodeCost {
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: number;
	seasonalHearts?: number;
}

interface Node {
	icon: string;
	cost: NodeCost | null;
	level?: 2 | 3 | 4 | 5 | 6;
}

const NODES: Readonly<Readonly<Node[]>[]> = [[]] as const;
export default NODES;
