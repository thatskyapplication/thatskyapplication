import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
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
		{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
	],
	patchNotesURL: String(new URL("p0230", LINK_REDIRECTOR_URL)),
});
