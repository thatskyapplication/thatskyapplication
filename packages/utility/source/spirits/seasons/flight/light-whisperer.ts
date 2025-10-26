import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.LightWhisperer,
	seasonId: SeasonId.Flight,
	call: Cosmetic.CallBabyManta,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			[{ cosmetic: Cosmetic.CallBabyManta }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.LightWhispererBlessing1,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.LightWhispererHairAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.LightWhispererHair,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.LightWhispererBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.LightWhispererTrailSpell1,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.LightWhispererCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.LightWhispererOutfit,
					cost: { seasonalCandles: 28 },
				},
				{ cosmetic: Cosmetic.LightWhispererTrailSpell2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.LightWhispererSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[{ cosmetic: Cosmetic.CallBabyManta }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.LightWhispererBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.LightWhispererHairAccessory,
					cost: { candles: 45 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.LightWhispererSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.LightWhispererWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.LightWhispererBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.LightWhispererHair,
					cost: { candles: 50 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.LightWhispererOutfit,
					cost: { candles: 65 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.LightWhispererCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2024, 2, 29), end: skyDate(2024, 3, 4) }],
	},
});
