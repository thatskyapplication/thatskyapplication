import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
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
			cosmetic: Cosmetic.StoneStool,
		},
	],
	seasonalCandlesRotation: [
		{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
	],
	patchNotesURL: String(new URL("p0250", LINK_REDIRECTOR_URL)),
});
