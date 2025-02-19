import type { Season } from "./constants.js";
import { CURRENT } from "./seasons/radiance/RadianceGuide.js";

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

export type FriendshipTreeData = Readonly<Readonly<(Node | null)[]>[]>;
export default CURRENT satisfies FriendshipTreeData;
