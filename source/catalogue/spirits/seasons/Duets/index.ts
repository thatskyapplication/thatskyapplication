import { Season } from "../../../../Structures/Season.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import DuetsGuide from "./DuetsGuide.js";
import TheCellistsBeginnings from "./TheCellistsBeginnings.js";
import TheMusiciansLegacy from "./TheMusiciansLegacy.js";
import ThePianistsBeginnings from "./ThePianistsBeginnings.js";

export default new Season({
	name: SeasonName.Duets,
	start: skyDate(2_024, 7, 15),
	end: skyDate(2_024, 9, 29),
	guide: DuetsGuide,
	spirits: [TheCellistsBeginnings, ThePianistsBeginnings, TheMusiciansLegacy],
	seasonalCandlesRotation: [
		{ rotation: 1, realm: RealmName.GoldenWasteland },
		{ rotation: 1, realm: RealmName.VaultOfKnowledge },
		{ rotation: 1, realm: RealmName.DaylightPrairie },
		{ rotation: 1, realm: RealmName.HiddenForest },
		{ rotation: 1, realm: RealmName.ValleyOfTriumph },
		{ rotation: 2, realm: RealmName.GoldenWasteland },
		{ rotation: 2, realm: RealmName.VaultOfKnowledge },
		{ rotation: 2, realm: RealmName.DaylightPrairie },
		{ rotation: 2, realm: RealmName.HiddenForest },
		{ rotation: 2, realm: RealmName.ValleyOfTriumph },
	],
});
