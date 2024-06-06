import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { CAPE_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Shush;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask17;
const capeEmoji = CAPE_EMOJIS.Cape18;

export default new SeasonalSpirit({
	name: SpiritName.ShushingLightScholar,
	season: SeasonName.Lightseekers,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShush1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteShush2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ShushingLightScholarBlessing1,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{ name: "Mask", cosmetic: Cosmetic.ShushingLightScholarMask, emoji: maskEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShush3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteShush4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ShushingLightScholarBlessing2,
				cost: { seasonalCandles: 20 },
				emoji: blessing2,
			},
			{ name: "Cape", cosmetic: Cosmetic.ShushingLightScholarCape, emoji: capeEmoji },
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteShush1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteShush2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ShushingLightScholarBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ShushingLightScholarMask,
				cost: { candles: 30 },
				emoji: maskEmoji,
			},
			{ name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteShush3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteShush4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ShushingLightScholarBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ShushingLightScholarCape,
				cost: { candles: 65 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(16, skyDate(2_020, 8, 20))
			.set(70, skyDate(2_022, 9, 15))
			.set(122, skyDate(2_024, 9, 12)),
	},
});
