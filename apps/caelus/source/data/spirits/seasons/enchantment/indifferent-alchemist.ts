import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Shrug;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask29;
const hairEmoji = HAIR_EMOJIS.Hair57;
const capeEmoji = CAPE_EMOJIS.Cape27;

export default new SeasonalSpirit({
	name: SpiritName.IndifferentAlchemist,
	seasonId: SeasonId.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShrug1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteShrug2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.IndifferentAlchemistBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.IndifferentAlchemistMask, emoji: maskEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShrug3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteShrug4, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.IndifferentAlchemistHair,
				cost: { seasonalCandles: 18 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.IndifferentAlchemistBlessing2, emoji: blessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.IndifferentAlchemistBlessing3,
				cost: { seasonalCandles: 20 },
				emoji: blessing2,
			},
			{ name: "Cape", cosmetic: Cosmetic.IndifferentAlchemistCape, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.IndifferentAlchemistSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.EnchantmentHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShrug1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteShrug2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.IndifferentAlchemistBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.IndifferentAlchemistMask,
				cost: { candles: 42 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.IndifferentAlchemistSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.IndifferentAlchemistWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShrug3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteShrug4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.IndifferentAlchemistBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.IndifferentAlchemistHair,
				cost: { candles: 42 },
				emoji: hairEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.IndifferentAlchemistCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: [21, 69],
		returning: [5],
	},
});
