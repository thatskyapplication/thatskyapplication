import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
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
		{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
	],
	patchNotesURL: patchNotesRoute("p0260"),
});
