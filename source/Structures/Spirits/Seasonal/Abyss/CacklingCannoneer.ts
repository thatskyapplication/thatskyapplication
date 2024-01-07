/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	EMOTES_EMOJIS,
	HAIR_EMOJIS,
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

const emote = Emote.EvilLaugh;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const emoteEmoji = EMOTES_EMOJIS.EvilLaugh;
const maskEmoji = MASK_EMOJIS.Mask54;
const hairEmoji = HAIR_EMOJIS.Hair98;
const capeEmoji = CAPE_EMOJIS.Cape70;

export default new SeasonalSpirit({
	name: SpiritName.CacklingCannoneer,
	season: SeasonName.Abyss,
	emote,
	realm: Realm.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { item: "Mask", cost: { candles: 40 }, emoji: maskEmoji })
			.set(1 << 12, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 13, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 11, { item: "Hair", cost: { candles: 50 }, emoji: hairEmoji })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 8, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji })
			.set(1 << 3, { item: "Music sheet", cost: { candles: 15 } }),
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 12 }, emoji: blessing2 })
			.set(1 << 3, { item: "Music sheet", cost: null })
			.set(1 << 4, { item: "Mask", cost: { seasonalCandles: 16 }, emoji: maskEmoji })
			.set(1 << 5, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 20 }, emoji: emoteEmoji })
			.set(1 << 7, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { item: "Cape", cost: { seasonalCandles: 26 }, emoji: capeEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, { item: "Blessing 4", cost: { seasonalCandles: 34 }, emoji: blessing3 })
			.set(1 << 11, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AbyssHeart }),
	},
	visits: {
		returning: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(4, skyDate(2_023, 8, 7)),
	},
});
