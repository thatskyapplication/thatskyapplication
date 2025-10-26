import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.MemoryOfALostVillage,
	seasonId: SeasonId.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MemoryOfALostVillageBlessing1,
					cost: { seasonalCandles: 20 },
				},
				{ cosmetic: Cosmetic.MemoryOfALostVillageCape, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.MemoryOfALostVillageOutfit,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MemoryOfALostVillageBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MemoryOfALostVillageBlessing3,
					cost: { seasonalCandles: 38 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MemoryOfALostVillageHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.MemoryOfALostVillageSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
