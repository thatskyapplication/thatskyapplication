import { Season } from "../../../../Structures/Season.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonId } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import CompassionateCellist from "./CompassionateCellist.js";
import DuetsGuide from "./DuetsGuide.js";
import TheCellistsBeginnings from "./TheCellistsBeginnings.js";
import TheCellistsFlourishing from "./TheCellistsFlourishing.js";
import TheMusiciansLegacy from "./TheMusiciansLegacy.js";
import ThePianistsBeginnings from "./ThePianistsBeginnings.js";
import ThePianistsFlourishing from "./ThePianistsFlourishing.js";

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
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1330",
});
