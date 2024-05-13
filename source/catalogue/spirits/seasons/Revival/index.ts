import { Season } from "../../../../Structures/Season.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import EchoOfAnAbandonedRefuge from "./EchoOfAnAbandonedRefuge.js";
import HopefulSteward from "./HopefulSteward.js";
import MemoryOfALostVillage from "./MemoryOfALostVillage.js";
import RemnantOfAForgottenHaven from "./RemnantOfAForgottenHaven.js";
import VestigeOfADesertedOasis from "./VestigeOfADesertedOasis.js";

export default new Season({
	name: SeasonName.Revival,
	start: skyDate(2_023, 10, 16),
	end: skyDate(2_023, 12, 31),
	guide: HopefulSteward,
	spirits: [VestigeOfADesertedOasis, MemoryOfALostVillage, EchoOfAnAbandonedRefuge, RemnantOfAForgottenHaven],
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
});
