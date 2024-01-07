/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CALLS_EMOJIS,
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit, SpiritName, Call } from "../../Base.js";

const call = Call.Crab;
const callEmoji = CALLS_EMOJIS.Crab;
const maskEmoji = MASK_EMOJIS.Mask16;
const hairEmoji = HAIR_EMOJIS.Hair40;
const capeEmoji = CAPE_EMOJIS.Cape16;
const placeablePropEmoji = PLACEABLE_PROPS_EMOJIS.PlaceableProp21;

export default new SeasonalSpirit({
	name: SpiritName.CrabWhisperer,
	season: SeasonName.Lightseekers,
	call,
	realm: Realm.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 3, { item: "Mask", cost: { seasonalCandles: 12 }, emoji: maskEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: null })
			.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 14 } })
			.set(1 << 7, { item: "Music sheet", cost: null })
			.set(1 << 10, { item: "Blessing 3", cost: { seasonalCandles: 16 } })
			.set(1 << 11, { item: "Blessing 4", cost: null })
			.set(1 << 8, { item: "Hair", cost: { seasonalCandles: 18 }, emoji: hairEmoji })
			.set(1 << 9, { item: "Cape", cost: null, emoji: capeEmoji }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { item: "Pipe", cost: { candles: 20 }, emoji: placeablePropEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Mask", cost: { candles: 30 }, emoji: maskEmoji })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 7, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 8, { item: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 9, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(6, skyDate(2_020, 4, 9))
			.set(43, skyDate(2_021, 9, 1)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(4, skyDate(2_023, 8, 7)),
	},
});
