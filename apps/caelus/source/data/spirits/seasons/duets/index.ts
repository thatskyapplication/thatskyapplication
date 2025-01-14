import { URL } from "node:url";
import { RealmName } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import { skyDate } from "../../../../utility/dates.js";
import CompassionateCellist from "./compassionate-cellist.js";
import DuetsGuide from "./duets-guide.js";
import TheCellistsBeginnings from "./the-cellists-beginnings.js";
import TheCellistsFlourishing from "./the-cellists-flourishing.js";
import TheMusiciansLegacy from "./the-musicians-legacy.js";
import ThePianistsBeginnings from "./the-pianists-beginnings.js";
import ThePianistsFlourishing from "./the-pianists-flourishing.js";

export default new Season({
	id: SeasonId.Duets,
	start: skyDate(2_024, 7, 15),
	end: skyDate(2_024, 9, 30),
	guide: DuetsGuide,
	spirits: [
		ThePianistsBeginnings,
		TheCellistsBeginnings,
		TheMusiciansLegacy,
		TheCellistsFlourishing,
		ThePianistsFlourishing,
		CompassionateCellist,
	],
	seasonalCandlesRotation: [
		{ rotation: 1, realm: RealmName.GoldenWasteland },
		{ rotation: 1, realm: RealmName.VaultOfKnowledge },
		{ rotation: 2, realm: RealmName.DaylightPrairie },
		{ rotation: 2, realm: RealmName.HiddenForest },
		{ rotation: 2, realm: RealmName.ValleyOfTriumph },
		{ rotation: 2, realm: RealmName.GoldenWasteland },
		{ rotation: 2, realm: RealmName.VaultOfKnowledge },
		{ rotation: 1, realm: RealmName.DaylightPrairie },
		{ rotation: 1, realm: RealmName.HiddenForest },
		{ rotation: 1, realm: RealmName.ValleyOfTriumph },
	],
	patchNotesURL: String(new URL("p0260", LINK_REDIRECTOR_URL)),
});
