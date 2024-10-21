import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility2/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import { skyDate } from "../../../../Utility2/dates.js";
import { CAPE_EMOJIS, HAIR_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility2/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility2/spirits.js";

const emote = SpiritEmote.Yoga;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const hairEmoji = HAIR_EMOJIS.Hair39;
const capeEmoji = CAPE_EMOJIS.Cape14;

export default new SeasonalSpirit({
	name: SpiritName.StretchingGuru,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteYoga1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteYoga2, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.StretchingGuruHair,
				cost: { seasonalCandles: 6 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.StretchingGuruBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteYoga3,
				cost: { seasonalCandles: 8 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteYoga4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StretchingGuruBlessing2,
				cost: { seasonalCandles: 10 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.StretchingGuruCape,
				cost: { hearts: 5 },
				emoji: capeEmoji,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteYoga1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteYoga2, cost: { hearts: 4 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.StretchingGuruBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.StretchingGuruHair,
				cost: { candles: 26 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cost: { candles: 3 },
				cosmetic: Cosmetic.StretchingGuruHeart,
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cost: { ascendedCandles: 2 },
				cosmetic: Cosmetic.StretchingGuruWingBuff,
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteYoga3, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteYoga4, cost: { hearts: 6 }, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.StretchingGuruBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.StretchingGuruCape,
				cost: { candles: 65 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(8, skyDate(2_020, 4, 30))
			.set(57, skyDate(2_022, 3, 17)),
	},
});
