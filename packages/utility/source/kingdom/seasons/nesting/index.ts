import { Cosmetic } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import NestingAtrium from "./nesting-atrium.js";
import NestingGuide from "./nesting-guide.js";
import NestingLoft from "./nesting-loft.js";
import NestingNook from "./nesting-nook.js";
import NestingSolarium from "./nesting-solarium.js";

export default new Season({
	id: SeasonId.Nesting,
	start: skyDate(2_024, 4, 15),
	end: skyDate(2_024, 7, 1),
	guide: NestingGuide,
	spirits: [NestingSolarium, NestingLoft, NestingAtrium, NestingNook],
	items: [
		{
			cosmetic: Cosmetic.StoneStool,
		},
	],
	seasonalCandlesRotation: [
		{ rotation: "1", realm: RealmName.ValleyOfTriumph },
		{ rotation: "1", realm: RealmName.GoldenWasteland },
		{ rotation: "1", realm: RealmName.VaultOfKnowledge },
		{ rotation: "1", realm: RealmName.DaylightPrairie },
		{ rotation: "1", realm: RealmName.HiddenForest },
		{ rotation: "2", realm: RealmName.ValleyOfTriumph },
		{ rotation: "2", realm: RealmName.GoldenWasteland },
		{ rotation: "2", realm: RealmName.VaultOfKnowledge },
		{ rotation: "2", realm: RealmName.DaylightPrairie },
		{ rotation: "2", realm: RealmName.HiddenForest },
	],
	doubleSeasonalLight: {
		identifier: "1+2",
		dates: [
			{ start: skyDate(2024, 4, 24), end: skyDate(2024, 4, 29) },
			{ start: skyDate(2024, 6, 10), end: skyDate(2024, 6, 17) },
		],
	},
});
