import { RealmName } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import { skyDate } from "../../../../utility/dates.js";
import RadianceGuide from "./radiance-guide.js";
import RadianceLeapingDancer from "./radiance-leaping-dancer.js";

export default new Season({
	id: SeasonId.Radiance,
	start: skyDate(2_025, 1, 20),
	end: skyDate(2_025, 4, 7),
	guide: RadianceGuide,
	spirits: [RadianceLeapingDancer],
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
	patchNotesURL: String(new URL("p0180", LINK_REDIRECTOR_URL)),
});
