import { Season } from "../../../../Structures/Season.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonId } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import EchoOfAnAbandonedRefuge from "./EchoOfAnAbandonedRefuge.js";
import HopefulSteward from "./HopefulSteward.js";
import MemoryOfALostVillage from "./MemoryOfALostVillage.js";
import RemnantOfAForgottenHaven from "./RemnantOfAForgottenHaven.js";
import VestigeOfADesertedOasis from "./VestigeOfADesertedOasis.js";

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
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1239",
});
