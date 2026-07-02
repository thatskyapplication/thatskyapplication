import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
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
					{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
					{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
					{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
					{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
				]
			: [
					{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
					{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
					{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
					{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
					{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
					{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
					{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
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
	doubleSeasonalLight: [
		{
			start: skyDate(2026, 6, 19),
			end: skyDate(2026, 7, 3),
		},
	],
});
