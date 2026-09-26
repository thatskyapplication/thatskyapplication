import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import AbyssGuide from "./abyss-guide.js";
import AnxiousAngler from "./anxious-angler.js";
import BumblingBoatswain from "./bumbling-boatswain.js";
import CacklingCannoneer from "./cackling-cannoneer.js";
import CeasingCommodore from "./ceasing-commodore.js";

export default new Season({
	id: SeasonId.Abyss,
	start: skyDate(2022, 1, 17),
	end: skyDate(2022, 3, 28),
	guide: AbyssGuide,
	spirits: [AnxiousAngler, CeasingCommodore, BumblingBoatswain, CacklingCannoneer],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2022, 3, 11)) >= 0
			? [
					{ rotation: "1", realm: RealmName.GoldenWasteland },
					{ rotation: "2", realm: RealmName.VaultOfKnowledge },
					{ rotation: "2", realm: RealmName.DaylightPrairie },
					{ rotation: "1", realm: RealmName.HiddenForest },
					{ rotation: "1", realm: RealmName.ValleyOfTriumph },
					{ rotation: "2", realm: RealmName.GoldenWasteland },
					{ rotation: "1", realm: RealmName.VaultOfKnowledge },
					{ rotation: "1", realm: RealmName.DaylightPrairie },
					{ rotation: "2", realm: RealmName.HiddenForest },
					{ rotation: "2", realm: RealmName.ValleyOfTriumph },
				]
			: Temporal.ZonedDateTime.compare(now, skyDate(2022, 2, 5)) >= 0
				? [
						{ rotation: "1", realm: RealmName.GoldenWasteland },
						{ rotation: "2", realm: RealmName.VaultOfKnowledge },
						{ rotation: "2", realm: RealmName.DaylightPrairie },
						{ rotation: "2", realm: RealmName.HiddenForest },
						{ rotation: "2", realm: RealmName.ValleyOfTriumph },
						{ rotation: "2", realm: RealmName.GoldenWasteland },
						{ rotation: "1", realm: RealmName.VaultOfKnowledge },
						{ rotation: "1", realm: RealmName.DaylightPrairie },
						{ rotation: "1", realm: RealmName.HiddenForest },
						{ rotation: "1", realm: RealmName.ValleyOfTriumph },
					]
				: [
						{ rotation: "1", realm: RealmName.GoldenWasteland },
						{ rotation: "2", realm: RealmName.VaultOfKnowledge },
						{ rotation: "2", realm: RealmName.DaylightPrairie },
						{ rotation: "2", realm: RealmName.HiddenForest },
						{ rotation: "1", realm: RealmName.ValleyOfTriumph },
						{ rotation: "2", realm: RealmName.GoldenWasteland },
						{ rotation: "1", realm: RealmName.VaultOfKnowledge },
						{ rotation: "1", realm: RealmName.DaylightPrairie },
						{ rotation: "1", realm: RealmName.HiddenForest },
						{ rotation: "2", realm: RealmName.ValleyOfTriumph },
					],
	doubleSeasonalLight: {
		identifier: "1+2",
		dates: [{ start: skyDate(2022, 2, 25), end: skyDate(2022, 3, 11) }],
	},
});
