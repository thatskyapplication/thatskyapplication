import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.LaidbackPioneer,
	seasonId: SeasonId.Lightseekers,
	stance: Cosmetic.StanceLaidback,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[{ cosmetic: Cosmetic.StanceLaidback }],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.LaidbackPioneerMask,
					cost: { seasonalCandles: 6 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.LaidbackPioneerBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.LaidbackPioneerBlessing2,
					cost: { seasonalCandles: 8 },
				},
				{ cosmetic: Cosmetic.LaidbackPioneerMusicSheet, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.LaidbackPioneerHair,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.LaidbackPioneerBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.LaidbackPioneerBlessing4,
					cost: { seasonalCandles: 20 },
				},
			],
			[{ cosmetic: Cosmetic.LaidbackPioneerUmbrella, seasonPass: true }],
		],
		current: [
			[{ cosmetic: Cosmetic.StanceLaidback }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.LaidbackPioneerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.LaidbackPioneerMask,
					cost: { candles: 30 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.LaidbackPioneerHeart,
					cost: { candles: 3 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.LaidbackPioneerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.LaidbackPioneerBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.LaidbackPioneerMusicSheet,
					cost: { candles: 15 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.LaidbackPioneerHair,
					cost: { candles: 18 },
				},
			],
			[
				{
					cosmetic: Cosmetic.LaidbackPioneerUmbrella,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 2, 27), end: skyDate(2020, 3, 2) },
			{ start: skyDate(2020, 11, 26), end: skyDate(2020, 11, 30) },
			{ start: skyDate(2022, 10, 13), end: skyDate(2022, 10, 17) },
			{ start: skyDate(2025, 6, 5), end: skyDate(2025, 6, 9) },
		],
	},
	hasMarketingVideo: true,
	keywords: ["umbrella"],
});
