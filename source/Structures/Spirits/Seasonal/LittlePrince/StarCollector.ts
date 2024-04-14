/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	EMOTE_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
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

const emote = Emote.HandRub;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const emoteEmoji = EMOTE_EMOJIS.HandRub;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace14;
const capeEmoji = CAPE_EMOJIS.Cape59;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp12;

export default new SeasonalSpirit({
	name: SpiritName.StarCollector,
	season: SeasonName.LittlePrince,
	emote,
	realm: Realm.VaultOfKnowledge,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { item: "Necktie", cost: { seasonalCandles: 12 }, emoji: necklaceEmoji })
			.set(1 << 3, { item: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 4, { item: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 20 }, emoji: blessing2 })
			.set(1 << 7, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 8, { item: "Prop", cost: { seasonalCandles: 24 }, emoji: placeablePropEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: null, emoji: blessing2 })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.LittlePrinceHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 10, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { item: "Necktie", cost: { candles: 40 }, emoji: necklaceEmoji })
			.set(1 << 11, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 4, { item: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 5, { item: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 6, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 7, { item: "Cape", cost: { candles: 75 }, emoji: capeEmoji })
			.set(1 << 8, { item: "Prop", cost: { candles: 70 }, emoji: placeablePropEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(96, skyDate(2_023, 9, 14)),
	},
});
