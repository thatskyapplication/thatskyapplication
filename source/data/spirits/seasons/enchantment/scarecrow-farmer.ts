import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Boo;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask30;
const hairEmoji = HAIR_EMOJIS.Hair54;

export default new SeasonalSpirit({
	name: SpiritName.ScarecrowFarmer,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBoo1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBoo2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ScarecrowFarmerBlessing1,
				cost: { seasonalCandles: 8 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.ScarecrowFarmerMask, emoji: maskEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBoo3,
				cost: { seasonalCandles: 10 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBoo4, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.ScarecrowFarmerHair,
				cost: { seasonalCandles: 12 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ScarecrowFarmerBlessing2, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ScarecrowFarmerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.EnchantmentHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBoo1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBoo2, cost: { hearts: 4 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ScarecrowFarmerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ScarecrowFarmerMask,
				cost: { candles: 42 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ScarecrowFarmerSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ScarecrowFarmerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteBoo3, cost: { hearts: 3 }, emoji: emoteEmoji },
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBoo4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ScarecrowFarmerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ScarecrowFarmerHair,
				cost: { candles: 34 },
				emoji: hairEmoji,
			},
		],
	},
	visits: {
		travelling: [58, 118],
	},
});
