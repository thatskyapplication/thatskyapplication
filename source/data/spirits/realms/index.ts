import DaylightPrairie from "./daylight-prairie/index.js";
import GoldenWasteland from "./golden-wasteland/index.js";
import HiddenForest from "./hidden-forest/index.js";
import IslesOfDawn from "./isles-of-dawn/index.js";
import ValleyOfTriumph from "./valley-of-triumph/index.js";
import VaultOfKnowledge from "./vault-of-knowledge/index.js";

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
