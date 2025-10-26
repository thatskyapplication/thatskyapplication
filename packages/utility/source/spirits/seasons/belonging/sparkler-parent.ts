import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Sparkler;

export default new SeasonalSpirit({
	id: SpiritId.SparklerParent,
	seasonId: SeasonId.Belonging,
	emote,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteSparkler1 },
				{ cosmetic: Cosmetic.EmoteSparkler2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SparklerParentBlessing1,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.SparklerParentMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSparkler3,
					cost: { seasonalCandles: 12 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteSparkler4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SparklerParentHair,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SparklerParentBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.SparklerParentSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteSparkler1 },
				{
					cosmetic: Cosmetic.EmoteSparkler2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SparklerParentBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.SparklerParentMask,
					cost: { candles: 36 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.SparklerParentSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.SparklerParentWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSparkler3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteSparkler4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SparklerParentBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SparklerParentHair,
					cost: { candles: 34 },
				},
			],
			[
				{
					cosmetic: Cosmetic.SparklerParentPinwheel,
					cost: { candles: 33 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2020, 5, 14), end: skyDate(2020, 5, 18) },
			{ start: skyDate(2021, 4, 1), end: skyDate(2021, 4, 5) },
			{ start: skyDate(2021, 12, 23), end: skyDate(2021, 12, 27) },
			{ start: skyDate(2023, 6, 22), end: skyDate(2023, 6, 26) },
		],
	},
});
