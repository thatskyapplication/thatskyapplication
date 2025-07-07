import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
import twoEmbersGuide from "./two-embers-guide.js";

export default new Season({
	id: SeasonId.TwoEmbers,
	start: skyDate(2_025, 7, 21),
	end: skyDate(2_025, 10, 7), // Not yet announced.
	guide: twoEmbersGuide,
	spirits: [],
	seasonalCandlesRotation: [
		{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
	],
});
