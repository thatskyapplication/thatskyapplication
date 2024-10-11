import { Season } from "../../../../Structures/Season.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import TheMoominStorybook from "./TheMoominStorybook.js";

export default new Season({
	name: SeasonName.Moomin,
	start: skyDate(2_024, 10, 14),
	end: skyDate(2_024, 12, 30),
	guide: TheMoominStorybook,
	spirits: [],
	seasonalCandlesRotation: [
		{ rotation: 1, realm: RealmName.VaultOfKnowledge },
		{ rotation: 1, realm: RealmName.DaylightPrairie },
		{ rotation: 1, realm: RealmName.HiddenForest },
		{ rotation: 1, realm: RealmName.ValleyOfTriumph },
		{ rotation: 1, realm: RealmName.GoldenWasteland },
		{ rotation: 2, realm: RealmName.VaultOfKnowledge },
		{ rotation: 2, realm: RealmName.DaylightPrairie },
		{ rotation: 2, realm: RealmName.HiddenForest },
		{ rotation: 2, realm: RealmName.ValleyOfTriumph },
		{ rotation: 2, realm: RealmName.GoldenWasteland },
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17-sky-children-of-the-light/faq/1356",
});
