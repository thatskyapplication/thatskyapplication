import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
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
	seasonalCandlesRotation: (now) =>
		Temporal.ZonedDateTime.compare(now, skyDate(2026, 6, 5)) >= 0
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
	items: [
		{
			translation: { key: CosmeticCommon.BouncePadMultiple, number: 2 },
			cosmetic: Cosmetic.BouncePad2,
			cost: { candles: 6 },
		},
		{
			translation: { key: CosmeticCommon.BouncePadMultiple, number: 3 },
			cosmetic: Cosmetic.BouncePad3,
			cost: { candles: 8 },
		},
	],
	doubleSeasonalLight: {
		identifier: "1+2",
		dates: [
			{
				start: skyDate(2026, 6, 19),
				end: skyDate(2026, 7, 3),
			},
		],
	},
});
