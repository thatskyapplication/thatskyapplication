import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.DeepBreath;

export default new SeasonalSpirit({
	id: SpiritId.ProphetOfWater,
	seasonId: SeasonId.Prophecy,
	emote,
	realm: RealmName.IsleOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteDeepBreath1 },
				{ cosmetic: Cosmetic.EmoteDeepBreath2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ProphetOfWaterBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ProphetOfWaterHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteDeepBreath3,
					cost: { seasonalCandles: 16 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteDeepBreath4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ProphetOfWaterBlessing2,
					cost: { seasonalCandles: 21 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ProphetOfWaterCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ProphetOfWaterMask,
					cost: { seasonalCandles: 27 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ProphetOfWaterBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ProphetOfWaterSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteDeepBreath1 },
				{
					cosmetic: Cosmetic.EmoteDeepBreath2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					cosmetic: Cosmetic.ProphetOfWaterProp,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ProphetOfWaterBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ProphetOfWaterHair,
					cost: { candles: 44 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ProphetOfWaterSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ProphetOfWaterWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteDeepBreath3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteDeepBreath4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ProphetOfWaterMask,
					cost: { candles: 54 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ProphetOfWaterBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.ProphetOfWaterCape,
					cost: { candles: 75 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2021, 8, 5), end: skyDate(2021, 8, 9) },
			{ start: skyDate(2022, 11, 10), end: skyDate(2022, 11, 14) },
			{ start: skyDate(2024, 12, 19), end: skyDate(2024, 12, 23) },
		],
		returning: [2],
	},
});
