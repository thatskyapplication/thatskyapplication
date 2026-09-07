import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import AsceticMonk from "./ascetic-monk.js";
import JollyGeologist from "./jolly-geologist.js";
import MomentsGuide from "./moments-guide.js";
import NightbirdWhisperer from "./nightbird-whisperer.js";
import ReassuringRanger from "./reassuring-ranger.js";

export default new Season({
	id: SeasonId.Moments,
	start: skyDate(2023, 7, 17),
	end: skyDate(2023, 10, 2),
	guide: MomentsGuide,
	spirits: [ReassuringRanger, NightbirdWhisperer, JollyGeologist, AsceticMonk],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2023, 9, 5)) >= 0
			? [
					{ rotation: "2", realm: RealmName.VaultOfKnowledge },
					{ rotation: "1", realm: RealmName.DaylightPrairie },
					{ rotation: "1", realm: RealmName.HiddenForest },
					{ rotation: "1", realm: RealmName.ValleyOfTriumph },
					{ rotation: "2", realm: RealmName.GoldenWasteland },
					{ rotation: "1", realm: RealmName.VaultOfKnowledge },
					{ rotation: "2", realm: RealmName.DaylightPrairie },
					{ rotation: "2", realm: RealmName.HiddenForest },
					{ rotation: "2", realm: RealmName.ValleyOfTriumph },
					{ rotation: "1", realm: RealmName.GoldenWasteland },
				]
			: Temporal.ZonedDateTime.compare(now, skyDate(2023, 8, 5)) >= 0
				? [
						{ rotation: "1", realm: RealmName.VaultOfKnowledge },
						{ rotation: "1", realm: RealmName.DaylightPrairie },
						{ rotation: "1", realm: RealmName.HiddenForest },
						{ rotation: "1", realm: RealmName.ValleyOfTriumph },
						{ rotation: "2", realm: RealmName.GoldenWasteland },
						{ rotation: "2", realm: RealmName.VaultOfKnowledge },
						{ rotation: "2", realm: RealmName.DaylightPrairie },
						{ rotation: "2", realm: RealmName.HiddenForest },
						{ rotation: "2", realm: RealmName.ValleyOfTriumph },
						{ rotation: "1", realm: RealmName.GoldenWasteland },
					]
				: [
						{ rotation: "1", realm: RealmName.VaultOfKnowledge },
						{ rotation: "1", realm: RealmName.DaylightPrairie },
						{ rotation: "1", realm: RealmName.HiddenForest },
						{ rotation: "1", realm: RealmName.ValleyOfTriumph },
						{ rotation: "1", realm: RealmName.GoldenWasteland },
						{ rotation: "2", realm: RealmName.VaultOfKnowledge },
						{ rotation: "2", realm: RealmName.DaylightPrairie },
						{ rotation: "2", realm: RealmName.HiddenForest },
						{ rotation: "2", realm: RealmName.ValleyOfTriumph },
						{ rotation: "2", realm: RealmName.GoldenWasteland },
					],
	doubleSeasonalLight: {
		identifier: "1+2",
		dates: [{ start: skyDate(2023, 9, 25), end: skyDate(2023, 10, 2) }],
	},
});
