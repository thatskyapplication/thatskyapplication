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
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ cosmetic: Cosmetic.EmoteDeepBreath1 },
			{ cosmetic: Cosmetic.EmoteDeepBreath2 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.ProphetOfWaterBlessing1,
				cost: { seasonalCandles: 12 },
			},
			{ cosmetic: Cosmetic.ProphetOfWaterHair },
			{
				cosmetic: Cosmetic.EmoteDeepBreath3,
				cost: { seasonalCandles: 16 },
			},
			{ cosmetic: Cosmetic.EmoteDeepBreath4 },
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.ProphetOfWaterBlessing2,
				cost: { seasonalCandles: 21 },
			},
			{ cosmetic: Cosmetic.ProphetOfWaterCape },
			{
				cosmetic: Cosmetic.ProphetOfWaterMask,
				cost: { seasonalCandles: 27 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
				cosmetic: Cosmetic.ProphetOfWaterBlessing3,
			},
			{
				cosmetic: Cosmetic.ProphetOfWaterSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ cosmetic: Cosmetic.EmoteDeepBreath1 },
			{
				cosmetic: Cosmetic.EmoteDeepBreath2,
				cost: { hearts: 4 },
			},
			{
				cosmetic: Cosmetic.ProphetOfWaterProp,
				cost: { candles: 15 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
				cosmetic: Cosmetic.ProphetOfWaterBlessing1,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ProphetOfWaterHair,
				cost: { candles: 44 },
			},
			{
				cosmetic: Cosmetic.ProphetOfWaterSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				translation: CosmeticCommon.WingBuff,
				cosmetic: Cosmetic.ProphetOfWaterWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				cosmetic: Cosmetic.EmoteDeepBreath3,
				cost: { hearts: 3 },
			},
			{
				cosmetic: Cosmetic.EmoteDeepBreath4,
				cost: { hearts: 6 },
			},
			{
				cosmetic: Cosmetic.ProphetOfWaterMask,
				cost: { candles: 54 },
			},
			{
				translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
				cosmetic: Cosmetic.ProphetOfWaterBlessing2,
				cost: { candles: 5 },
			},
			{
				cosmetic: Cosmetic.ProphetOfWaterCape,
				cost: { candles: 75 },
			},
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
