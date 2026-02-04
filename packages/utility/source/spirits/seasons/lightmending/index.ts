import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
import lightmendingChampion from "./lightmending-champion.js";
import lightmendingGuide from "./lightmending-guide.js";
import lightmendingLightCatcher from "./lightmending-light-catcher.js";
import lightmendingLightPioneer from "./lightmending-light-pioneer.js";
import lightmendingLightScholar from "./lightmending-light-scholar.js";

export default new Season({
	id: SeasonId.Lightmending,
	start: skyDate(2026, 1, 16),
	end: skyDate(2026, 4, 3),
	guide: lightmendingGuide,
	spirits: [
		lightmendingChampion,
		lightmendingLightCatcher,
		lightmendingLightScholar,
		lightmendingLightPioneer,
	],
	seasonalCandlesRotation: [
		{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
		{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
		{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
		{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
		{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
		{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
	],
	doubleSeasonalLight: [{ start: skyDate(2026, 2, 27), end: skyDate(2026, 3, 13) }],
});
