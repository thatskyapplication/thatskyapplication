import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
import migrationGuide from "./migration-guide.js";

export default new Season({
	id: SeasonId.Migration,
	start: skyDate(2_025, 10, 20),
	end: skyDate(2_026, 1, 5),
	guide: migrationGuide,
	spirits: [],
	seasonalCandlesRotation: [
		{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
	],
	patchNotesURL: patchNotesRoute("31"),
});
