import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
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
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2026, 4, 1)) >= 0
			? [
					{ rotation: "1", realm: RealmName.GoldenWasteland },
					{ rotation: "1", realm: RealmName.VaultOfKnowledge },
					{ rotation: "1", realm: RealmName.DaylightPrairie },
					{ rotation: "1", realm: RealmName.HiddenForest },
					{ rotation: "2", realm: RealmName.ValleyOfTriumph },
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "2", realm: RealmName.DaylightPrairie },
					{ rotation: "2", realm: RealmName.HiddenForest },
					{ rotation: "1", realm: RealmName.ValleyOfTriumph },
				]
			: Temporal.ZonedDateTime.compare(now, skyDate(2026, 3, 16)) >= 0
				? [
						{ rotation: "1", realm: RealmName.GoldenWasteland },
						{ rotation: "1", realm: RealmName.VaultOfKnowledge },
						{ rotation: "1", realm: RealmName.DaylightPrairie },
						{ rotation: "1", realm: RealmName.HiddenForest },
						{ rotation: "2", realm: RealmName.ValleyOfTriumph },
						{ rotation: "2", realm: RealmName.GoldenWasteland },
						{ rotation: "2", realm: RealmName.VaultOfKnowledge },
						{ rotation: "2", realm: RealmName.DaylightPrairie },
						{ rotation: "2", realm: RealmName.HiddenForest },
						{ rotation: "1", realm: RealmName.ValleyOfTriumph },
					]
				: Temporal.ZonedDateTime.compare(now, skyDate(2026, 2, 5)) >= 0
					? [
							{ rotation: "2", realm: RealmName.GoldenWasteland },
							{ rotation: "1", realm: RealmName.VaultOfKnowledge },
							{ rotation: "1", realm: RealmName.DaylightPrairie },
							{ rotation: "1", realm: RealmName.HiddenForest },
							{ rotation: "1", realm: RealmName.ValleyOfTriumph },
							{ rotation: "1", realm: RealmName.GoldenWasteland },
							{ rotation: "2", realm: RealmName.VaultOfKnowledge },
							{ rotation: "2", realm: RealmName.DaylightPrairie },
							{ rotation: "2", realm: RealmName.HiddenForest },
							{ rotation: "2", realm: RealmName.ValleyOfTriumph },
						]
					: [
							{ rotation: "1", realm: RealmName.GoldenWasteland },
							{ rotation: "1", realm: RealmName.VaultOfKnowledge },
							{ rotation: "1", realm: RealmName.DaylightPrairie },
							{ rotation: "1", realm: RealmName.HiddenForest },
							{ rotation: "1", realm: RealmName.ValleyOfTriumph },
							{ rotation: "2", realm: RealmName.GoldenWasteland },
							{ rotation: "2", realm: RealmName.VaultOfKnowledge },
							{ rotation: "2", realm: RealmName.DaylightPrairie },
							{ rotation: "2", realm: RealmName.HiddenForest },
							{ rotation: "2", realm: RealmName.ValleyOfTriumph },
						],
	doubleSeasonalLight: {
		identifier: "1+2",
		dates: [{ start: skyDate(2026, 2, 27), end: skyDate(2026, 3, 13) }],
	},
});
