import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.SenseOfSelf,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.SenseOfSelfMusicSheet,
				cost: { seasonalCandles: 12 },
			},
			{
				cosmetic: Cosmetic.SenseOfSelfBlessing1,
			},
			{
				cosmetic: Cosmetic.SenseOfSelfBlessing2,
				cost: { seasonalCandles: 18 },
			},
			{
				cosmetic: Cosmetic.SenseOfSelfShoes,
			},
			{
				cosmetic: Cosmetic.SenseOfSelfNeckAccessory,
				cost: { seasonalCandles: 24 },
			},
			{
				cosmetic: Cosmetic.SenseOfSelfBlessing3,
			},
			{
				cosmetic: Cosmetic.SenseOfSelfBlessing4,
				cost: { seasonalCandles: 28 },
			},
			{
				cosmetic: Cosmetic.SenseOfSelfHairAccessory,
			},
			{
				cosmetic: Cosmetic.SenseOfSelfSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
