import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Beckon;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask51;
const hairEmoji = HAIR_EMOJIS.Hair88;

export default new SeasonalSpirit({
	name: SpiritName.BeckoningRuler,
	season: SeasonName.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { seasonalCandles: 14 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 9, emoji: hairEmoji },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 20 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Frog mask", bit: 1 << 4, cost: { seasonalCandles: 26 }, emoji: maskEmoji },
			{ name: "Blessing 2", bit: 1 << 8, emoji: blessing2 },
			{
				name: "Seasonal heart",
				bit: 1 << 2,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.LittlePrinceHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Heart", bit: 1 << 2, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Blessing 1", bit: 1 << 3, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Frog mask", bit: 1 << 4, cost: { candles: 42 }, emoji: maskEmoji },
			{
				name: "Wing buff",
				bit: 1 << 5,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 8, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 9, cost: { candles: 48 }, emoji: hairEmoji },
		],
	},
	keywords: ["frog", "frog mask"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			71,
			skyDate(2_022, 9, 29),
		),
	},
});
