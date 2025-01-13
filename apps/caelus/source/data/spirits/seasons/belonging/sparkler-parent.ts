import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Sparkler;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing1 = MISCELLANEOUS_EMOJIS.Blessing1;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask21;
const hairEmoji = HAIR_EMOJIS.Hair47;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp12;

export default new SeasonalSpirit({
	name: SpiritName.SparklerParent,
	seasonId: SeasonId.Belonging,
	emote,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSparkler1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSparkler2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SparklerParentBlessing1,
				cost: { seasonalCandles: 10 },
				emoji: blessing1,
			},
			{ name: "Mask", cosmetic: Cosmetic.SparklerParentMask, emoji: maskEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSparkler3,
				cost: { seasonalCandles: 12 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSparkler4, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.SparklerParentHair,
				cost: { seasonalCandles: 14 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.SparklerParentBlessing2, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SparklerParentSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.BelongingHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSparkler1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSparkler2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SparklerParentBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.SparklerParentMask,
				cost: { candles: 36 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SparklerParentSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SparklerParentWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSparkler3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSparkler4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SparklerParentBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SparklerParentHair,
				cost: { candles: 34 },
				emoji: hairEmoji,
			},
			{
				name: "Pinwheel",
				cosmetic: Cosmetic.SparklerParentPinwheel,
				cost: { candles: 33 },
				emoji: placeablePropEmoji,
			},
		],
	},
	visits: {
		travelling: [9, 32, 51, 90],
	},
});
