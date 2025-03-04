import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import NestingAtrium from "./nesting-atrium.js";
import NestingGuide from "./nesting-guide.js";
import NestingLoft from "./nesting-loft.js";
import NestingNook from "./nesting-nook.js";
import NestingSolarium from "./nesting-solarium.js";

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
	patchNotesURL: String(new URL("p0250", LINK_REDIRECTOR_URL)),
});
