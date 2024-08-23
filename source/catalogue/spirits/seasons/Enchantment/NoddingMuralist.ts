import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Nod;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask27;
const hairEmoji = HAIR_EMOJIS.Hair53;

export default new SeasonalSpirit({
	name: SpiritName.NoddingMuralist,
	season: SeasonName.Enchantment,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteNod1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteNod2, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.NoddingMuralistMask,
				cost: { seasonalCandles: 6 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.NoddingMuralistBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteNod3,
				cost: { seasonalCandles: 8 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteNod4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.NoddingMuralistBlessing2,
				cost: { seasonalCandles: 10 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.NoddingMuralistHair, emoji: hairEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NoddingMuralistSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.EnchantmentHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteNod1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteNod2, cost: { hearts: 4 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.NoddingMuralistBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.NoddingMuralistMask,
				cost: { candles: 30 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.NoddingMuralistSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.NoddingMuralistWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteNod3, cost: { hearts: 3 }, emoji: emoteEmoji },
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteNod4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.NoddingMuralistBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.NoddingMuralistHair,
				cost: { candles: 34 },
				emoji: hairEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(26, skyDate(2_021, 1, 7))
			.set(73, skyDate(2_022, 10, 27)),
		returning: [5],
	},
});
