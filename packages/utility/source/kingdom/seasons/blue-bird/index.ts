import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import blueBirdGuide from "./blue-bird-guide.js";
import costumedConfettiCousin from "./costumed-confetti-cousin.js";
import diviningWiseGrandparent from "./divining-wise-grandparent.js";
import nostalgicSparklerParent from "./nostalgic-sparkler-parent.js";
import royalHairtousleTeen from "./royal-hairtousle-teen.js";
import woodcuttingPleafulParent from "./woodcutting-pleaful-parent.js";

export default new Season({
	id: SeasonId.BlueBird,
	start: skyDate(2_025, 4, 21),
	end: skyDate(2_025, 7, 7),
	guide: blueBirdGuide,
	spirits: [
		costumedConfettiCousin,
		diviningWiseGrandparent,
		woodcuttingPleafulParent,
		nostalgicSparklerParent,
		royalHairtousleTeen,
	],
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2_025, 6, 5)) >= 0
			? [
					{ rotation: "2", realm: RealmName.GoldenWasteland },
					{ rotation: "2", realm: RealmName.VaultOfKnowledge },
					{ rotation: "2", realm: RealmName.DaylightPrairie },
					{ rotation: "2", realm: RealmName.HiddenForest },
					{ rotation: "2", realm: RealmName.ValleyOfTriumph },
					{ rotation: "1", realm: RealmName.GoldenWasteland },
					{ rotation: "1", realm: RealmName.VaultOfKnowledge },
					{ rotation: "1", realm: RealmName.DaylightPrairie },
					{ rotation: "1", realm: RealmName.HiddenForest },
					{ rotation: "1", realm: RealmName.ValleyOfTriumph },
				]
			: Temporal.ZonedDateTime.compare(now, skyDate(2_025, 5, 1)) >= 0
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
						{ rotation: "4", realm: RealmName.GoldenWasteland },
						{ rotation: "4", realm: RealmName.VaultOfKnowledge },
						{ rotation: "4", realm: RealmName.DaylightPrairie },
						{ rotation: "4", realm: RealmName.HiddenForest },
						{ rotation: "4", realm: RealmName.ValleyOfTriumph },
						{ rotation: "3", realm: RealmName.GoldenWasteland },
						{ rotation: "3", realm: RealmName.VaultOfKnowledge },
						{ rotation: "3", realm: RealmName.DaylightPrairie },
						{ rotation: "3", realm: RealmName.HiddenForest },
						{ rotation: "3", realm: RealmName.ValleyOfTriumph },
					],
	doubleSeasonalLight: {
		identifier: "1+2",
		dates: [{ start: skyDate(2_025, 6, 9), end: skyDate(2_025, 6, 23) }],
	},
});
