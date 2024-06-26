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
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.ShowDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask38;
const hairEmoji = HAIR_EMOJIS.Hair71;
const capeEmoji = CAPE_EMOJIS.Cape44;
const heldProp = HELD_PROPS_EMOJIS.HeldProp20;

export default new SeasonalSpirit({
	name: SpiritName.DancingPerformer,
	season: SeasonName.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 3, cost: { candles: 45 }, emoji: hairEmoji },
			{ name: "Heart", bit: 1 << 10, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 11,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.AscendedCandle,
			},
			{ name: `${emote} 3`, bit: 1 << 4, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Mask", bit: 1 << 7, cost: { candles: 48 }, emoji: maskEmoji },
			{ name: "Blessing 2", bit: 1 << 6, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Lute", bit: 1 << 9, cost: { candles: 70 }, emoji: heldProp },
			{ name: "Cape", bit: 1 << 8, cost: { candles: 75 }, emoji: capeEmoji },
		],
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 12 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 3, emoji: hairEmoji },
			{ name: `${emote} 3`, bit: 1 << 4, cost: { seasonalCandles: 16 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 6, cost: { seasonalCandles: 21 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 7, emoji: maskEmoji },
			{ name: "Cape", bit: 1 << 8, cost: { seasonalCandles: 27 }, emoji: capeEmoji },
			{ name: "Lute", bit: 1 << 9, emoji: heldProp },
			{
				name: "Seasonal heart",
				bit: 1 << 10,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DreamsHeart,
			},
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			112,
			skyDate(2_024, 4, 25),
		),
	},
});
