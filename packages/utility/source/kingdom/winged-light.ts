import { WING_BUFFS } from "../cosmetics.js";
import { AREAS } from "./areas/index.js";
import { AreaName, RealmName } from "./geography.js";
import { REALMS } from "./realms/index.js";

export const WINGED_LIGHT_AREAS = [
	RealmName.IsleOfDawn,
	RealmName.DaylightPrairie,
	RealmName.HiddenForest,
	RealmName.ValleyOfTriumph,
	RealmName.GoldenWasteland,
	RealmName.VaultOfKnowledge,
	RealmName.EyeOfEden,
	AreaName.AncientMemory,
] as const;

type WingedLightAreas = (typeof WINGED_LIGHT_AREAS)[number];

export const WINGED_LIGHT_THRESHOLDS = [
	1, 2, 5, 10, 20, 35, 55, 75, 100, 120, 150, 200, 250, 300,
] as const satisfies Readonly<number[]>;

function wingedLightForRealm(realmName: RealmName) {
	return REALMS.find((realm) => realm.name === realmName)!.wingedLight;
}

function wingedLightForArea(areaName: AreaName.AncientMemory | AreaName.ThePassage) {
	return AREAS.find((area) => area.name === areaName)!.wingedLight;
}

export const TopLevelAreaToWingedLight = {
	[RealmName.IsleOfDawn]: wingedLightForRealm(RealmName.IsleOfDawn),
	[RealmName.DaylightPrairie]: wingedLightForRealm(RealmName.DaylightPrairie),
	[RealmName.HiddenForest]: wingedLightForRealm(RealmName.HiddenForest),
	[RealmName.ValleyOfTriumph]: wingedLightForRealm(RealmName.ValleyOfTriumph),
	[RealmName.GoldenWasteland]: wingedLightForRealm(RealmName.GoldenWasteland),
	[RealmName.VaultOfKnowledge]: wingedLightForRealm(RealmName.VaultOfKnowledge),
	[RealmName.EyeOfEden]: wingedLightForRealm(RealmName.EyeOfEden),
	[AreaName.AncientMemory]: wingedLightForArea(AreaName.AncientMemory),
	[AreaName.ThePassage]: wingedLightForArea(AreaName.ThePassage),
} as const satisfies Readonly<Record<WingedLightAreas | AreaName.ThePassage, number>>;

export const TOP_LEVEL_WINGED_LIGHT_IN_AREAS = Object.values(TopLevelAreaToWingedLight).reduce(
	(wingedLightCount, wingedLight) => wingedLightCount + wingedLight,
	0,
);

export const MAXIMUM_WINGED_LIGHT = TOP_LEVEL_WINGED_LIGHT_IN_AREAS + WING_BUFFS.length;
