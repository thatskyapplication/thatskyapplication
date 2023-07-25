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
}

export default [[]] as const satisfies Readonly<Readonly<Node[]>[]>;
