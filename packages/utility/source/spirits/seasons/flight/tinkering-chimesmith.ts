import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.TinkeringChimesmith,
	seasonId: SeasonId.Flight,
	stance: Cosmetic.StanceTinker,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[{ cosmetic: Cosmetic.StanceTinker }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TinkeringChimesmithBlessing1,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TinkeringChimesmithOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.TinkeringChimesmithHairAccessory,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TinkeringChimesmithBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TinkeringChimesmithTrailSpell1,
					cost: { seasonalCandles: 26 },
				},
				{ cosmetic: Cosmetic.TinkeringChimesmithKalimba, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TinkeringChimesmithHair,
					cost: { seasonalCandles: 28 },
				},
				{
					cosmetic: Cosmetic.TinkeringChimesmithTrailSpell2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.TinkeringChimesmithSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[{ cosmetic: Cosmetic.StanceTinker }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TinkeringChimesmithBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.TinkeringChimesmithHair,
					cost: { candles: 45 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.TinkeringChimesmithSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.TinkeringChimesmithWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TinkeringChimesmithBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.TinkeringChimesmithHairAccessory,
					cost: { candles: 35 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.TinkeringChimesmithOutfit,
					cost: { candles: 70 },
				},
			],
			[
				{
					cosmetic: Cosmetic.TinkeringChimesmithKalimba,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2023, 5, 11), end: skyDate(2023, 5, 15) },
			{ start: skyDate(2025, 8, 14), end: skyDate(2025, 8, 18) },
		],
	},
});
