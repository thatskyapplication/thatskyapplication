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

interface NodeSeasonalCost {
	cost: number;
	season: Season;
}

interface NodeCost {
	candles?: number;
	hearts?: number;
	ascendedCandles?: number;
	seasonalCandles?: NodeSeasonalCost;
	seasonalHearts?: NodeSeasonalCost;
}

export interface Node {
	icon: `https://${string}`;
	cost?: NodeCost;
	level?: 2 | 3 | 4 | 5 | 6;
	seasonIcon?: Season;
	flatLine?: boolean;
	nodes?: readonly Node[];
}

const NODES: Readonly<Readonly<(Node | null)[]>[]> = [[]] as const;
export default NODES;
