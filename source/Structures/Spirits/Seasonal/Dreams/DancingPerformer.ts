/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	EMOTE_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.ShowDance;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const emoteEmoji = EMOTE_EMOJIS.ShowDance;
const maskEmoji = MASK_EMOJIS.Mask38;
const hairEmoji = HAIR_EMOJIS.Hair71;
const capeEmoji = CAPE_EMOJIS.Cape44;
const heldProp = HELD_PROPS_EMOJIS.HeldProp20;

export default new SeasonalSpirit({
	name: SpiritName.DancingPerformer,
	season: SeasonName.Dreams,
	emote,
	realm: Realm.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { item: "Hair", cost: { candles: 45 }, emoji: hairEmoji })
			.set(1 << 10, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 11, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.AscendedCandle })
			.set(1 << 4, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 7, { item: "Mask", cost: { candles: 48 }, emoji: maskEmoji })
			.set(1 << 6, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 9, { item: "Lute", cost: { candles: 48 }, emoji: heldProp })
			.set(1 << 8, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 12 }, emoji: blessing2 })
			.set(1 << 3, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 4, { item: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 21 }, emoji: blessing2 })
			.set(1 << 7, { item: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 8, { item: "Cape", cost: { seasonalCandles: 27 }, emoji: capeEmoji })
			.set(1 << 9, { item: "Lute", cost: null, emoji: heldProp })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.DreamsHeart }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(112, skyDate(2_024, 4, 25)),
	},
});
