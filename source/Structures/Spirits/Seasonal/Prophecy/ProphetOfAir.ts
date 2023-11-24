/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.Balance;

export default new SeasonalSpirit({
	name: SpiritName.ProphetOfAir,
	season: SeasonName.Prophecy,
	emote,
	realm: Realm.IslesOfDawn,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: null })
			.set(1 << 4, { item: "Hair", cost: { seasonalCandles: 13 } })
			.set(1 << 3, { item: "Blessing 1", cost: null })
			.set(1 << 7, { item: `${emote} 3`, cost: { seasonalCandles: 18 } })
			.set(1 << 8, { item: `${emote} 4`, cost: null })
			.set(1 << 10, { item: "Blessing 2", cost: { seasonalCandles: 23 } })
			.set(1 << 9, { item: "Mask", cost: null })
			.set(1 << 11, { item: "Cape", cost: { seasonalCandles: 29 } })
			.set(1 << 12, { item: "Blessing 3", cost: null })
			.set(1 << 5, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 3 } })
			.set(1 << 2, { item: "Prop", cost: { candles: 15 } })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 4, { item: "Hair", cost: { candles: 44 } })
			.set(1 << 5, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 6, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 7, { item: `${emote} 3`, cost: { hearts: 3 } })
			.set(1 << 8, { item: `${emote} 4`, cost: { hearts: 6 } })
			.set(1 << 9, { item: "Mask", cost: { candles: 54 } })
			.set(1 << 10, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 11, { item: "Cape", cost: { candles: 75 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(61, skyDate(2_022, 5, 12)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(2, skyDate(2_023, 5, 15)),
	},
});
