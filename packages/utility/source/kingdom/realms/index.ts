import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { ElderSpirit, StandardSpirit } from "../../models/spirits.js";
import type { SpiritIds } from "../../utility/spirits.js";
import DaylightPrairie from "./daylight-prairie/index.js";
import eyeOfEden from "./eye-of-eden/index.js";
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
	eyeOfEden,
] as const;

let standardSpirits = new Collection<SpiritIds, StandardSpirit>();
let elderSpirits = new Collection<SpiritIds, ElderSpirit>();

for (const realm of REALMS) {
	if (realm.spirits) {
		standardSpirits = standardSpirits.concat(realm.spirits);
	}

	if (realm.elder) {
		elderSpirits = elderSpirits.set(realm.elder.id, realm.elder);
	}
}

export const STANDARD_SPIRITS: ReadonlyCollection<SpiritIds, StandardSpirit> = standardSpirits;
export const ELDER_SPIRITS: ReadonlyCollection<SpiritIds, ElderSpirit> = elderSpirits;

export const REALM_SPIRITS = STANDARD_SPIRITS.merge<ElderSpirit, StandardSpirit | ElderSpirit>(
	ELDER_SPIRITS,
	(value) => ({ keep: true, value }),
	(value) => ({ keep: true, value }),
	() => {
		throw new Error("Duplicate spirits detected.");
	},
);
