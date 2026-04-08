import { Collection } from "@discordjs/collection";
import type { ElderSpirit, StandardSpirit } from "../../models/spirits.js";
import type { SpiritIds } from "../../utility/spirits.js";
import DaylightPrairie from "./daylight-prairie/index.js";
import GoldenWasteland from "./golden-wasteland/index.js";
import HiddenForest from "./hidden-forest/index.js";
import IsleOfDawn from "./isle-of-dawn/index.js";
import ValleyOfTriumph from "./valley-of-triumph/index.js";
import VaultOfKnowledge from "./vault-of-knowledge/index.js";

export const REALMS = [
	IsleOfDawn,
	DaylightPrairie,
	HiddenForest,
	ValleyOfTriumph,
	GoldenWasteland,
	VaultOfKnowledge,
] as const;

export const STANDARD_SPIRITS = IsleOfDawn.spirits.concat(
	DaylightPrairie.spirits,
	HiddenForest.spirits,
	ValleyOfTriumph.spirits,
	GoldenWasteland.spirits,
	VaultOfKnowledge.spirits,
);

export const ELDER_SPIRITS = [
	IsleOfDawn.elder,
	DaylightPrairie.elder,
	HiddenForest.elder,
	ValleyOfTriumph.elder,
	GoldenWasteland.elder,
	VaultOfKnowledge.elder,
].reduce(
	(spirits, spirit) => spirits.set(spirit.id, spirit),
	new Collection<SpiritIds, ElderSpirit>(),
);

export const REALM_SPIRITS = STANDARD_SPIRITS.merge<ElderSpirit, StandardSpirit | ElderSpirit>(
	ELDER_SPIRITS,
	(value) => ({ keep: true, value }),
	(value) => ({ keep: true, value }),
	() => {
		throw new Error("Duplicate spirits detected.");
	},
);
