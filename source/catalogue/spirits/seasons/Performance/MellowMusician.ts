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

const emote = SpiritEmote.Headbob;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const maskEmoji = MASK_EMOJIS.Mask64;
const hairEmoji = HAIR_EMOJIS.Hair107;
const capeEmoji = CAPE_EMOJIS.Cape80;
const heldProp = HELD_PROPS_EMOJIS.HeldProp25;

export default new SeasonalSpirit({
	name: SpiritName.MellowMusician,
	season: SeasonName.Performance,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Mask", bit: 1 << 2, cost: { seasonalCandles: 12 }, emoji: maskEmoji },
			{ name: "Blessing 1", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 4, cost: { seasonalCandles: 14 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 5, emoji: capeEmoji },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 18 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Blessing 3", bit: 1 << 8, cost: { seasonalCandles: 22 }, emoji: blessing3 },
			{ name: "Electric guitar", bit: 1 << 9, emoji: heldProp },
			{ name: "Hair", bit: 1 << 10, cost: { seasonalCandles: 36 }, emoji: hairEmoji },
			{ name: "Blessing 4", bit: 1 << 11, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 12,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PerformanceHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 3, cost: { candles: 5 }, emoji: blessing3 },
			{ name: "Mask", bit: 1 << 2, cost: { candles: 32 }, emoji: maskEmoji },
			{
				name: "Heart",
				bit: 1 << 12,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				bit: 1 << 13,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Cape", bit: 1 << 5, cost: { candles: 70 }, emoji: capeEmoji },
			{ name: "Blessing 2", bit: 1 << 4, cost: { candles: 5 }, emoji: blessing3 },
			{ name: "Hair", bit: 1 << 10, cost: { candles: 42 }, emoji: hairEmoji },
			{ name: "Electric guitar", bit: 1 << 9, cost: { candles: 80 }, emoji: heldProp },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			119,
			skyDate(2_024, 8, 1),
		),
	},
});
