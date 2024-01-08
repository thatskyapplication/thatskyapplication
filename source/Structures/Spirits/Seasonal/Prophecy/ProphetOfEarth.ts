/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	EMOTE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	PLACEABLE_PROPS_EMOJIS,
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

const emote = Emote.DustOff;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const emoteEmoji = EMOTE_EMOJIS.DustOff;
const maskEmoji = MASK_EMOJIS.Mask33;
const hairEmoji = HAIR_EMOJIS.Hair66;
const capeEmoji = CAPE_EMOJIS.Cape36;
const placeablePropEmoji = PLACEABLE_PROPS_EMOJIS.PlaceableProp34;

export default new SeasonalSpirit({
	name: SpiritName.ProphetOfEarth,
	season: SeasonName.Prophecy,
	emote,
	realm: Realm.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 4, { item: "Hair", cost: { seasonalCandles: 12 }, emoji: hairEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 7, { item: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 8, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 9, { item: "Music sheet", cost: { seasonalCandles: 21 } })
			.set(1 << 10, { item: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 11, { item: "Cape", cost: { seasonalCandles: 27 }, emoji: capeEmoji })
			.set(1 << 12, { item: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 5, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.ProphecyHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { item: "Prop", cost: { candles: 15 }, emoji: placeablePropEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { item: "Hair", cost: { candles: 44 }, emoji: hairEmoji })
			.set(1 << 5, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 7, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 8, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 9, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 10, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 11, { item: "Cape", cost: { candles: 75 }, emoji: capeEmoji })
			.set(1 << 12, { item: "Mask", cost: { candles: 44 }, emoji: maskEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set("Error", skyDate(2_022, 1, 6))
			.set(54, skyDate(2_022, 2, 3)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(2, skyDate(2_023, 5, 15)),
	},
});
