import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import type { RealmDefinition } from "../../models/realm.js";
import type { ElderSpirit, StandardSpirit } from "../../models/spirits.js";
import type { SpiritIds } from "../../utility/spirits.js";
import DaylightPrairie from "./daylight-prairie/index.js";
import eyeOfEden from "./eye-of-eden/index.js";
import GoldenWasteland from "./golden-wasteland/index.js";
import HiddenForest from "./hidden-forest/index.js";
import IsleOfDawn from "./isle-of-dawn/index.js";
import ValleyOfTriumph from "./valley-of-triumph/index.js";
import VaultOfKnowledge from "./vault-of-knowledge/index.js";

export const REALM_DEFINITIONS: readonly RealmDefinition[] = [
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

for (const realm of REALM_DEFINITIONS) {
	if (realm.spirits) {
		standardSpirits = standardSpirits.concat(
			realm.spirits.reduce(
				(collection, spirit) => collection.set(spirit.id, spirit),
				new Collection<SpiritIds, StandardSpirit>(),
			),
		);
	}

	if (realm.elder) {
		elderSpirits = elderSpirits.set(realm.elder.id, realm.elder);
	}
}

export const STANDARD_SPIRITS: ReadonlyCollection<SpiritIds, StandardSpirit> = standardSpirits;
export const ELDER_SPIRITS: ReadonlyCollection<SpiritIds, ElderSpirit> = elderSpirits;
