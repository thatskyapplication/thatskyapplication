import { URL } from "node:url";
import { RealmName, SeasonId, skyDate } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import EchoOfAnAbandonedRefuge from "./echo-of-an-abandoned-refuge.js";
import HopefulSteward from "./hopeful-steward.js";
import MemoryOfALostVillage from "./memory-of-a-lost-village.js";
import RemnantOfAForgottenHaven from "./remnant-of-a-forgotten-haven.js";
import VestigeOfADesertedOasis from "./vestige-of-a-deserted-oasis.js";

export default new Season({
	id: SeasonId.Revival,
	start: skyDate(2_023, 10, 16),
	end: skyDate(2_024, 1, 1),
	guide: HopefulSteward,
	spirits: [
		VestigeOfADesertedOasis,
		MemoryOfALostVillage,
		EchoOfAnAbandonedRefuge,
		RemnantOfAForgottenHaven,
	],
	seasonalCandlesRotation: [
		{ rotation: 2, realm: RealmName.DaylightPrairie },
		{ rotation: 1, realm: RealmName.HiddenForest },
		{ rotation: 1, realm: RealmName.ValleyOfTriumph },
		{ rotation: 1, realm: RealmName.GoldenWasteland },
		{ rotation: 1, realm: RealmName.VaultOfKnowledge },
		{ rotation: 1, realm: RealmName.DaylightPrairie },
		{ rotation: 2, realm: RealmName.HiddenForest },
		{ rotation: 2, realm: RealmName.ValleyOfTriumph },
		{ rotation: 2, realm: RealmName.GoldenWasteland },
		{ rotation: 2, realm: RealmName.VaultOfKnowledge },
	],
	patchNotesURL: String(new URL("p0230", LINK_REDIRECTOR_URL)),
});
