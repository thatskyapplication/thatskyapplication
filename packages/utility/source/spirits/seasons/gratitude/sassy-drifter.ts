import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.SassyDrifter,
	seasonId: SeasonId.Gratitude,
	stance: Cosmetic.StanceSassy,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			[{ cosmetic: Cosmetic.StanceSassy }],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SassyDrifterHair,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SassyDrifterBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SassyDrifterBlessing2,
					cost: { seasonalCandles: 8 },
				},
			],
			[{ cosmetic: Cosmetic.SassyDrifterMask, seasonPass: true }],
		],
		current: [
			[{ cosmetic: Cosmetic.StanceSassy }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SassyDrifterBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SassyDrifterHair,
					cost: { candles: 26 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.SassyDrifterHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.SassyDrifterWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SassyDrifterBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.SassyDrifterMask,
					cost: { candles: 48 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 1, 31, 12), end: skyDate(2020, 2, 3) },
			{ start: skyDate(2020, 5, 28), end: skyDate(2020, 6, 1) },
			{ start: skyDate(2021, 7, 8), end: skyDate(2021, 7, 12) },
			{ start: skyDate(2022, 12, 8), end: skyDate(2022, 12, 12) },
			{ start: skyDate(2024, 4, 11), end: skyDate(2024, 4, 15) },
		],
	},
	keywords: ["weasel", "weasel mask"],
});
