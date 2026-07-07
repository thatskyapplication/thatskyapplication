import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.MemoryOfALostVillage,
	seasonId: SeasonId.Revival,
	area: AreaName.AviaryVillage,
	offer: {
		seasonal: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MemoryOfALostVillageBlessing1,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.MemoryOfALostVillageCape,
					seasonPass: true,
				},
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
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.MemoryOfALostVillageSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MemoryOfALostVillageBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MemoryOfALostVillageHair,
					cost: { candles: 42 },
				},
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.MemoryOfALostVillageSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.MemoryOfALostVillageWingBuff,
					cost: { ascendedCandles: 2 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.MemoryOfALostVillageOutfit,
					cost: { candles: 63 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.MemoryOfALostVillageCape,
					cost: { candles: 77 },
				},
			],
		],
	},
	visits: {
		returning: [13],
	},
});
