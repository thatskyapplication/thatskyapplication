import DaylightPrairie from "./daylight-prairie/index2.js";
import GoldenWasteland from "./golden-wasteland/index2.js";
import HiddenForest from "./hidden-forest/index2.js";
import IslesOfDawn from "./isles-of-dawn/index2.js";
import ValleyOfTriumph from "./valley-of-triumph/index2.js";
import VaultOfKnowledge from "./vault-of-knowledge/index2.js";

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
