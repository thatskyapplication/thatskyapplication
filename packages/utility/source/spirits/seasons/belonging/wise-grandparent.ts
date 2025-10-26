import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.WiseGrandparent,
	seasonId: SeasonId.Belonging,
	stance: Cosmetic.StanceWise,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			[{ cosmetic: Cosmetic.StanceWise }],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WiseGrandparentBlessing1,
					cost: { seasonalCandles: 10 },
				},
				{ cosmetic: Cosmetic.WiseGrandparentMusicSheet, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.WiseGrandparentBlessing2,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.WiseGrandparentBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.WiseGrandparentMask,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.WiseGrandparentBlessing4,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 5 },
					cosmetic: Cosmetic.WiseGrandparentBlessing5,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.WiseGrandparentCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.WiseGrandparentSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.StanceWise },
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.WiseGrandparentMusicSheet,
					cost: { candles: 15 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.WiseGrandparentSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WiseGrandparentBlessing1,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.WiseGrandparentWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.WiseGrandparentBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.WiseGrandparentCape,
					cost: { candles: 70 },
				},
				{
					cosmetic: Cosmetic.WiseGrandparentProp,
					cost: { candles: 10 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.WiseGrandparentMask,
					cost: { candles: 48 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 8, 6), end: skyDate(2020, 8, 10) },
			{ start: skyDate(2021, 11, 11), end: skyDate(2021, 11, 15) },
			{ start: skyDate(2023, 11, 9), end: skyDate(2023, 11, 13) },
		],
	},
});
