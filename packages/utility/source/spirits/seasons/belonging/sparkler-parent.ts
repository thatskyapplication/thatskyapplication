import { Cosmetic } from "../../../cosmetics.js";
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
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSparkler1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSparkler2 },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SparklerParentBlessing1,
				cost: { seasonalCandles: 10 },
			},
			{ name: "Mask", cosmetic: Cosmetic.SparklerParentMask },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSparkler3,
				cost: { seasonalCandles: 12 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSparkler4 },
			{
				name: "Hair",
				cosmetic: Cosmetic.SparklerParentHair,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.SparklerParentBlessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SparklerParentSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSparkler1 },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSparkler2,
				cost: { hearts: 4 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SparklerParentBlessing1,
				cost: { candles: 5 },
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.SparklerParentMask,
				cost: { candles: 36 },
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SparklerParentSeasonalHeart,
				cost: { candles: 3 },
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SparklerParentWingBuff,
				cost: { ascendedCandles: 2 },
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSparkler3,
				cost: { hearts: 3 },
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSparkler4,
				cost: { hearts: 6 },
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SparklerParentBlessing2,
				cost: { candles: 5 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SparklerParentHair,
				cost: { candles: 34 },
			},
			{
				name: "Pinwheel",
				cosmetic: Cosmetic.SparklerParentPinwheel,
				cost: { candles: 33 },
			},
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
