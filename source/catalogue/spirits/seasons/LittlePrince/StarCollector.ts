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
	CAPE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.HandRub;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace14;
const capeEmoji = CAPE_EMOJIS.Cape59;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp12;

export default new SeasonalSpirit({
	name: SpiritName.StarCollector,
	season: SeasonName.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Necktie", bit: 1 << 2, cost: { seasonalCandles: 12 }, emoji: necklaceEmoji },
			{ name: "Blessing 1", bit: 1 << 3, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 4, cost: { seasonalCandles: 16 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 6, cost: { seasonalCandles: 20 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 7, emoji: capeEmoji },
			{ name: "Prop", bit: 1 << 8, cost: { seasonalCandles: 24 }, emoji: placeablePropEmoji },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing2 },
			{
				name: "Seasonal heart",
				bit: 1 << 10,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.LittlePrinceHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Heart", bit: 1 << 10, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Blessing 1", bit: 1 << 3, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Necktie", bit: 1 << 2, cost: { candles: 40 }, emoji: necklaceEmoji },
			{
				name: "Wing buff",
				bit: 1 << 11,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 4, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 6, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 7, cost: { candles: 75 }, emoji: capeEmoji },
			{ name: "Prop", bit: 1 << 8, cost: { candles: 70 }, emoji: placeablePropEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			96,
			skyDate(2_023, 9, 14),
		),
	},
});
