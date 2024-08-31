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
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Anxious;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit29;
const maskEmoji = MASK_EMOJIS.Mask57;
const hairEmoji = HAIR_EMOJIS.Hair100;
const capeEmoji = CAPE_EMOJIS.Cape71;

export default new SeasonalSpirit({
	name: SpiritName.AnxiousAngler,
	season: SeasonName.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAnxious1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteAnxious2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.AnxiousAnglerBlessing1,
				cost: { seasonalCandles: 8 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.AnxiousAnglerMask, emoji: maskEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.AnxiousAnglerHair,
				cost: { seasonalCandles: 14 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.AnxiousAnglerBlessing2, emoji: blessing3 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAnxious3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteAnxious4, emoji: emoteEmoji },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.AnxiousAnglerBlessing3,
				cost: { seasonalCandles: 22 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.AnxiousAnglerCape, emoji: capeEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.AnxiousAnglerOutfit,
				cost: { seasonalCandles: 38 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.AnxiousAnglerBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.AnxiousAnglerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AbyssHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAnxious1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteAnxious2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.AnxiousAnglerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.AnxiousAnglerHair,
				cost: { candles: 45 },
				emoji: hairEmoji,
			},
			{
				name: "heart",
				cosmetic: Cosmetic.AnxiousAnglerSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAnxious3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteAnxious4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.AnxiousAnglerMask,
				cost: { candles: 35 },
				emoji: maskEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.AnxiousAnglerBlessing2,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.AnxiousAnglerCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.AnxiousAnglerOutfit,
				cost: { candles: 65 },
				emoji: outfitEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			105,
			skyDate(2_024, 1, 18),
		),
	},
});
