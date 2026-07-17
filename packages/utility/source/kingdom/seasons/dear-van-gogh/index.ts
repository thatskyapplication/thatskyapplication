import { Cosmetic, CosmeticPackName } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { RotationIdentifier, SeasonId } from "../../../season.js";
import { RealmName } from "../../geography.js";
import artisticMemory from "./artistic-memory.js";
import dutchMemory from "./dutch-memory.js";
import joyfulMemory from "./joyful-memory.js";
import rusticMemory from "./rustic-memory.js";
import vaseWithFifteenSunflowers from "./vase-with-fifteen-sunflowers.js";

export default new Season({
	id: SeasonId.DearVanGogh,
	start: skyDate(2026, 7, 17),
	end: skyDate(2026, 10, 2),
	guide: vaseWithFifteenSunflowers,
	spirits: [dutchMemory, rusticMemory, artisticMemory, joyfulMemory],
	// Waiting on the wiki.
	// seasonalCandlesRotation: [
	// 	{ rotation: RotationIdentifier.One, realm: RealmName.DaylightPrairie },
	// 	{ rotation: RotationIdentifier.One, realm: RealmName.HiddenForest },
	// 	{ rotation: RotationIdentifier.One, realm: RealmName.ValleyOfTriumph },
	// 	{ rotation: RotationIdentifier.One, realm: RealmName.GoldenWasteland },
	// 	{ rotation: RotationIdentifier.One, realm: RealmName.VaultOfKnowledge },
	// 	{ rotation: RotationIdentifier.Two, realm: RealmName.DaylightPrairie },
	// 	{ rotation: RotationIdentifier.Two, realm: RealmName.HiddenForest },
	// 	{ rotation: RotationIdentifier.Two, realm: RealmName.ValleyOfTriumph },
	// 	{ rotation: RotationIdentifier.Two, realm: RealmName.GoldenWasteland },
	// 	{ rotation: RotationIdentifier.Two, realm: RealmName.VaultOfKnowledge },
	// ],
	items: [
		{
			cosmetic: Cosmetic.WheatfieldCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.StarryNightsVisage,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.StarryNightsKiss,
			cost: { money: 4.99 },
		},
		{
			cosmetic: [Cosmetic.StarryNightsMantleCape, Cosmetic.StarryNightsMantleNeckAccessory],
			cosmeticDisplay: Cosmetic.StarryNightsMantleCape,
			packName: CosmeticPackName.StarryNightsMantle,
			cost: { money: 24.99 },
		},
	],
});
