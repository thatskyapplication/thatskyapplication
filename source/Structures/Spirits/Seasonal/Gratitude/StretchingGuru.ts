/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Expression,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const expression = Expression.Yoga;

export default new SeasonalSpirit({
	name: SpiritName.StretchingGuru,
	season: SeasonName.Gratitude,
	expression,
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 3, { item: "Hair", cost: { seasonalCandles: 6 } })
			.set(1 << 2, { item: "Blessing 1", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 8 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 8, { item: "Blessing 2", cost: { seasonalCandles: 10 } })
			.set(1 << 9, { item: "Cape", cost: { hearts: 5 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Hair", cost: { candles: 26 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${expression} 3`, cost: { hearts: 3 } })
			.set(1 << 7, { item: `${expression} 4`, cost: { hearts: 6 } })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Cape", cost: { candles: 65 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(8, skyDate(2_020, 4, 30))
			.set(57, skyDate(2_022, 3, 17)),
	},
});
