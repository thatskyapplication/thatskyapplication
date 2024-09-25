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
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.BoogieDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing1 = MISCELLANEOUS_EMOJIS.Blessing1;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const outfitEmoji = OUTFIT_EMOJIS.Outfit10;
const maskEmoji = MASK_EMOJIS.Mask18;

export default new SeasonalSpirit({
	name: SpiritName.BoogieKid,
	season: SeasonName.Belonging,
	emote,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBoogieDance1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBoogieDance2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BoogieKidBlessing1,
				cost: { seasonalCandles: 8 },
				emoji: blessing1,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.BoogieKidBlessing2, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBoogieDance3,
				cost: { seasonalCandles: 10 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBoogieDance4, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.BoogieKidMask,
				cost: { seasonalCandles: 12 },
				emoji: maskEmoji,
			},
			{ name: "Outfit", cosmetic: Cosmetic.BoogieKidOutfit, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BoogieKidSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.BelongingHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBoogieDance1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBoogieDance2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BoogieKidBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.BoogieKidMask, cost: { candles: 30 }, emoji: maskEmoji },
			{
				name: "Heart",
				cosmetic: Cosmetic.BoogieKidSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BoogieKidWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBoogieDance3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBoogieDance4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BoogieKidBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.BoogieKidOutfit,
				cost: { candles: 60 },
				emoji: outfitEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(22, skyDate(2_020, 11, 12))
			.set(40, skyDate(2_021, 7, 22))
			.set(82, skyDate(2_023, 3, 2)),
	},
});
