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
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "3", realm: RealmName.DaylightPrairie },
					{ rotation: "3", realm: RealmName.HiddenForest },
					{ rotation: "4", realm: RealmName.ValleyOfTriumph },
					{ rotation: "1", realm: RealmName.GoldenWasteland },
					{ rotation: "2", realm: RealmName.VaultOfKnowledge },
					{ rotation: "4", realm: RealmName.DaylightPrairie },
					{ rotation: "4", realm: RealmName.HiddenForest },
					{ rotation: "3", realm: RealmName.ValleyOfTriumph },
				]
			: Temporal.ZonedDateTime.compare(now, skyDate(2026, 3, 16)) >= 0
				? [
						{ rotation: "3", realm: RealmName.GoldenWasteland },
						{ rotation: "3", realm: RealmName.VaultOfKnowledge },
						{ rotation: "3", realm: RealmName.DaylightPrairie },
						{ rotation: "3", realm: RealmName.HiddenForest },
						{ rotation: "4", realm: RealmName.ValleyOfTriumph },
						{ rotation: "4", realm: RealmName.GoldenWasteland },
						{ rotation: "4", realm: RealmName.VaultOfKnowledge },
						{ rotation: "4", realm: RealmName.DaylightPrairie },
						{ rotation: "4", realm: RealmName.HiddenForest },
						{ rotation: "3", realm: RealmName.ValleyOfTriumph },
					]
				: Temporal.ZonedDateTime.compare(now, skyDate(2026, 2, 5)) >= 0
					? [
							{ rotation: "4", realm: RealmName.GoldenWasteland },
							{ rotation: "3", realm: RealmName.VaultOfKnowledge },
							{ rotation: "3", realm: RealmName.DaylightPrairie },
							{ rotation: "3", realm: RealmName.HiddenForest },
							{ rotation: "3", realm: RealmName.ValleyOfTriumph },
							{ rotation: "3", realm: RealmName.GoldenWasteland },
							{ rotation: "4", realm: RealmName.VaultOfKnowledge },
							{ rotation: "4", realm: RealmName.DaylightPrairie },
							{ rotation: "4", realm: RealmName.HiddenForest },
							{ rotation: "4", realm: RealmName.ValleyOfTriumph },
						]
					: [
							{ rotation: "3", realm: RealmName.GoldenWasteland },
							{ rotation: "3", realm: RealmName.VaultOfKnowledge },
							{ rotation: "3", realm: RealmName.DaylightPrairie },
							{ rotation: "3", realm: RealmName.HiddenForest },
							{ rotation: "3", realm: RealmName.ValleyOfTriumph },
							{ rotation: "4", realm: RealmName.GoldenWasteland },
							{ rotation: "4", realm: RealmName.VaultOfKnowledge },
							{ rotation: "4", realm: RealmName.DaylightPrairie },
							{ rotation: "4", realm: RealmName.HiddenForest },
							{ rotation: "4", realm: RealmName.ValleyOfTriumph },
						],
	doubleSeasonalLight: {
		identifier: "3+4",
		dates: [{ start: skyDate(2026, 2, 27), end: skyDate(2026, 3, 13) }],
	},
});
