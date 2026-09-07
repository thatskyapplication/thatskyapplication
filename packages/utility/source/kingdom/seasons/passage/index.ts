import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import MelancholyMope from "./melancholy-mope.js";
import OddballOutcast from "./oddball-outcast.js";
import OveractiveOverachiever from "./overactive-overachiever.js";
import PassageGuide from "./passage-guide.js";
import TumblingTroublemaker from "./tumbling-troublemaker.js";

export default new Season({
	id: SeasonId.Passage,
	start: skyDate(2023, 4, 17),
	end: skyDate(2023, 7, 3),
	guide: PassageGuide,
	spirits: [OddballOutcast, TumblingTroublemaker, MelancholyMope, OveractiveOverachiever],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2023, 7, 2)) >= 0
			? [
					{ rotation: "3", realm: RealmName.GoldenWasteland },
					{ rotation: "4", realm: RealmName.VaultOfKnowledge },
					{ rotation: "3", realm: RealmName.DaylightPrairie },
					{ rotation: "3", realm: RealmName.HiddenForest },
					{ rotation: "3", realm: RealmName.ValleyOfTriumph },
					{ rotation: "4", realm: RealmName.GoldenWasteland },
					{ rotation: "3", realm: RealmName.VaultOfKnowledge },
					{ rotation: "4", realm: RealmName.DaylightPrairie },
					{ rotation: "4", realm: RealmName.HiddenForest },
					{ rotation: "4", realm: RealmName.ValleyOfTriumph },
				]
			: Temporal.ZonedDateTime.compare(now, skyDate(2023, 6, 5)) >= 0
				? [
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
					]
				: Temporal.ZonedDateTime.compare(now, skyDate(2023, 5, 1)) >= 0
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
		dates: [{ start: skyDate(2023, 5, 15), end: skyDate(2023, 5, 22) }],
	},
});
