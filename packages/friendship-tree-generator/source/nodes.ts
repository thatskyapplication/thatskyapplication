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

interface Node {
	icon: string;
	cost: NodeCost | null;
	level?: 2 | 3 | 4 | 5 | 6;
	seasonIcon?: Season;
}

const NODES: Readonly<Readonly<Node[]>[]> = [[]] as const;
export default NODES;
