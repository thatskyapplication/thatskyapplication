import { Season } from "../../../Structures/Season.js";
import { RealmName } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/dates.js";
import { SeasonName } from "../../../Utility/seasons.js";
import NestingAtrium from "./NestingAtrium.js";
import NestingGuide from "./NestingGuide.js";
import NestingLoft from "./NestingLoft.js";
import NestingNook from "./NestingNook.js";
import NestingSolarium from "./NestingSolarium.js";

export default new Season({
	name: SeasonName.Nesting,
	start: skyDate(2_024, 4, 15),
	end: skyDate(2_024, 6, 30),
	guide: NestingGuide,
	spirits: [NestingSolarium, NestingLoft, NestingAtrium, NestingNook],
	seasonalCandlesRotation: [
		{ rotation: 1, realm: RealmName.ValleyOfTriumph },
		{ rotation: 1, realm: RealmName.GoldenWasteland },
		{ rotation: 1, realm: RealmName.VaultOfKnowledge },
		{ rotation: 1, realm: RealmName.DaylightPrairie },
		{ rotation: 1, realm: RealmName.HiddenForest },
		{ rotation: 2, realm: RealmName.ValleyOfTriumph },
		{ rotation: 2, realm: RealmName.GoldenWasteland },
		{ rotation: 2, realm: RealmName.VaultOfKnowledge },
		{ rotation: 2, realm: RealmName.DaylightPrairie },
		{ rotation: 2, realm: RealmName.HiddenForest },
	],
});
