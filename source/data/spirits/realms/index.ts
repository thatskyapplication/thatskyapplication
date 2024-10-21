import DaylightPrairie from "./Daylight-Prairie/index.js";
import GoldenWasteland from "./Golden-Wasteland/index.js";
import HiddenForest from "./Hidden-Forest/index.js";
import IslesOfDawn from "./Isles-Of-Dawn/index.js";
import ValleyOfTriumph from "./Valley-Of-Triumph/index.js";
import VaultOfKnowledge from "./Vault-Of-Knowledge/index.js";

export const REALMS = [
	IslesOfDawn,
	DaylightPrairie,
	HiddenForest,
	ValleyOfTriumph,
	GoldenWasteland,
	VaultOfKnowledge,
] as const;

export const STANDARD_SPIRITS = [
	...IslesOfDawn.spirits,
	...DaylightPrairie.spirits,
	...HiddenForest.spirits,
	...ValleyOfTriumph.spirits,
	...GoldenWasteland.spirits,
	...VaultOfKnowledge.spirits,
] as const;

export const ELDER_SPIRITS = [
	IslesOfDawn.elder,
	DaylightPrairie.elder,
	HiddenForest.elder,
	ValleyOfTriumph.elder,
	GoldenWasteland.elder,
	VaultOfKnowledge.elder,
] as const;

export const REALM_SPIRITS = [...STANDARD_SPIRITS, ...ELDER_SPIRITS] as const;
