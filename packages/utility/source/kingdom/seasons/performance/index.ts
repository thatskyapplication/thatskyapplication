import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import ForgetfulStoryteller from "./forgetful-storyteller.js";
import FranticStagehand from "./frantic-stagehand.js";
import MellowMusician from "./mellow-musician.js";
import ModestDancer from "./modest-dancer.js";
import PerformanceGuide from "./performance-guide.js";

export default new Season({
	id: SeasonId.Performance,
	start: skyDate(2022, 4, 11),
	end: skyDate(2022, 6, 27),
	guide: PerformanceGuide,
	spirits: [FranticStagehand, ForgetfulStoryteller, MellowMusician, ModestDancer],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2022, 6, 5)) >= 0
			? [
					{ rotation: "3", realm: RealmName.ValleyOfTriumph },
					{ rotation: "4", realm: RealmName.GoldenWasteland },
					{ rotation: "4", realm: RealmName.VaultOfKnowledge },
					{ rotation: "4", realm: RealmName.DaylightPrairie },
					{ rotation: "4", realm: RealmName.HiddenForest },
					{ rotation: "4", realm: RealmName.ValleyOfTriumph },
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "3", realm: RealmName.DaylightPrairie },
					{ rotation: "3", realm: RealmName.HiddenForest },
				]
			: [
					{ rotation: "4", realm: RealmName.ValleyOfTriumph },
					{ rotation: "4", realm: RealmName.GoldenWasteland },
					{ rotation: "4", realm: RealmName.VaultOfKnowledge },
					{ rotation: "4", realm: RealmName.DaylightPrairie },
					{ rotation: "4", realm: RealmName.HiddenForest },
					{ rotation: "3", realm: RealmName.ValleyOfTriumph },
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "3", realm: RealmName.DaylightPrairie },
					{ rotation: "3", realm: RealmName.HiddenForest },
				],
	doubleSeasonalLight: {
		identifier: "3+4",
		dates: [{ start: skyDate(2022, 6, 20), end: skyDate(2022, 6, 27) }],
	},
});
