interface NodeCost {
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: number;
	seasonalHearts?: number;
}

type Season =
	| "Gratitude"
	| "Lightseekers"
	| "Belonging"
	| "Rhythm"
	| "Enchantment"
	| "Sanctuary"
	| "Prophecy"
	| "Dreams"
	| "Assembly"
	| "Little Prince"
	| "Flight"
	| "Abyss"
	| "Performance"
	| "Shattering"
	| "AURORA"
	| "Remembrance"
	| "Passage"
	| "Moments";

export interface Node {
	icon: string;
	cost: NodeCost | null;
	level?: 2 | 3 | 4 | 5 | 6;
	seasonIcon?: Season;
	nodes?: readonly Node[];
}

const NODES: Readonly<Readonly<(Node | null)[]>[]> = [[]] as const;
export default NODES;
