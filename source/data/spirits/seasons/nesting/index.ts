import { Season } from "../../../../models/Season.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import { LARGE_PLACEABLE_PROPS_EMOJIS } from "../../../../utility/emojis.js";
import NestingAtrium from "./NestingAtrium.js";
import NestingGuide from "./NestingGuide.js";
import NestingLoft from "./NestingLoft.js";
import NestingNook from "./NestingNook.js";
import NestingSolarium from "./NestingSolarium.js";

export default new Season({
	id: SeasonId.Nesting,
	start: skyDate(2_024, 4, 15),
	end: skyDate(2_024, 7, 1),
	guide: NestingGuide,
	spirits: [NestingSolarium, NestingLoft, NestingAtrium, NestingNook],
	items: [
		{
			name: "Stone stool",
			cosmetic: Cosmetic.StoneStool,
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp42,
		},
	],
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
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1308",
});
