import { WING_BUFFS } from "../cosmetics.js";
import { AREAS } from "./graph.js";

export const WINGED_LIGHT_THRESHOLDS = [
	1, 2, 5, 10, 20, 35, 55, 75, 100, 120, 150, 200, 250, 300,
] as const satisfies Readonly<number[]>;

export const TOP_LEVEL_WINGED_LIGHT_IN_AREAS = [...AREAS.values()].reduce(
	(wingedLightCount, area) => wingedLightCount + area.wingedLight,
	0,
);

export const MAXIMUM_WINGED_LIGHT = TOP_LEVEL_WINGED_LIGHT_IN_AREAS + WING_BUFFS.length;
