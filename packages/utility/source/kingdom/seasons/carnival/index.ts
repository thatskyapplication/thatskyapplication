import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import carnivalAthleticDancer from "./carnival-athletic-dancer.js";
import carnivalGuide from "./carnival-guide.js";
import carnivalJuggler from "./carnival-juggler.js";
import carnivalPuzzleDirector from "./carnival-puzzle-director.js";
import carnivalStuntActor from "./carnival-stunt-actor.js";

export default new Season({
	id: SeasonId.Carnival,
	start: skyDate(2026, 4, 17),
	end: skyDate(2026, 7, 3),
	guide: carnivalGuide,
	spirits: [carnivalAthleticDancer, carnivalJuggler, carnivalPuzzleDirector, carnivalStuntActor],
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
