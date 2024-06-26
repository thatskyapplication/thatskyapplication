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
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Respect;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask26;
const hairEmoji = HAIR_EMOJIS.Hair51;
const heldProp = HELD_PROPS_EMOJIS.HeldProp15;

export default new SeasonalSpirit({
	name: SpiritName.RespectfulPianist,
	season: SeasonName.Rhythm,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 3, cost: { seasonalCandles: 14 }, emoji: hairEmoji },
			{ name: "Blessing 1", bit: 1 << 2, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 16 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 8, cost: { seasonalCandles: 18 }, emoji: blessing2 },
			{ name: "Winter piano", bit: 1 << 9, emoji: heldProp },
			{ name: "Duck mask", bit: 1 << 10, cost: { seasonalCandles: 20 }, emoji: maskEmoji },
			{ name: "Blessing 3", bit: 1 << 11, emoji: blessing2 },
			{
				name: "Seasonal heart",
				bit: 1 << 4,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RhythmHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 3, cost: { candles: 26 }, emoji: hairEmoji },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 5,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 8, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Winter piano", bit: 1 << 9, cost: { candles: 75 }, emoji: heldProp },
			{ name: "Duck mask", bit: 1 << 10, cost: { candles: 48 }, emoji: maskEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(
			28,
			skyDate(2_021, 2, 4),
		),
		returning: [3],
	},
});
