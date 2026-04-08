import { WING_BUFFS } from "../cosmetics.js";
import { REALM_NAME_VALUES, RealmName, SkyMap } from "./geography.js";

export const WINGED_LIGHT_AREAS = [...REALM_NAME_VALUES, SkyMap.AncientMemory] as const;

type WingedLightAreas = (typeof WINGED_LIGHT_AREAS)[number];

export const WINGED_LIGHT_THRESHOLDS = [
	1, 2, 5, 10, 20, 35, 55, 75, 100, 120, 150, 200, 250, 300,
] as const satisfies Readonly<number[]>;

export const AreaToWingedLight = {
	[RealmName.IsleOfDawn]: 10,
	[RealmName.DaylightPrairie]: 24,
	[RealmName.HiddenForest]: 21,
	[RealmName.ValleyOfTriumph]: 17,
	[RealmName.GoldenWasteland]: 18,
	[RealmName.VaultOfKnowledge]: 16,
	[RealmName.EyeOfEden]: 10,
	[SkyMap.AncientMemory]: 6,
	[SkyMap.ThePassage]: 1,
} as const satisfies Readonly<Record<WingedLightAreas | SkyMap.ThePassage, number>>;

export const WINGED_LIGHT_IN_AREAS = Object.values(AreaToWingedLight).reduce(
	(wingedLightCount, wingedLight) => wingedLightCount + wingedLight,
	0,
);

export const MINIMUM_WINGED_LIGHT = 0 as const;
export const MAXIMUM_WINGED_LIGHT = WINGED_LIGHT_IN_AREAS + WING_BUFFS.length;
