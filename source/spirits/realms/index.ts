import DaylightPrairie from "./DaylightPrairie/index.js";
import GoldenWasteland from "./GoldenWasteland/index.js";
import HiddenForest from "./HiddenForest/index.js";
import IslesOfDawn from "./IslesOfDawn/index.js";
import ValleyOfTriumph from "./ValleyOfTriumph/index.js";
import VaultOfKnowledge from "./VaultOfKnowledge/index.js";

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
