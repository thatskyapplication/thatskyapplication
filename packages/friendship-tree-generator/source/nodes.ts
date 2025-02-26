import type { SeasonIds } from "@thatskyapplication/utility";
import { CURRENT } from "./seasons/radiance/RadianceGuide.js";

interface NodeSeasonalCost {
	cost: number;
	season: SeasonIds;
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
	seasonIcon?: SeasonIds;
	flatLine?: boolean;
	nodes?: readonly Node[];
}

export type FriendshipTreeData = Readonly<Readonly<(Node | null)[]>[]>;
export default CURRENT satisfies FriendshipTreeData;
