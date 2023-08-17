/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Expression,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const expression = Expression.Navigate;

export default new SeasonalSpirit({
	name: SpiritName.LivelyNavigator,
	season: Season.Flight,
	expression,
	realm: Realm.HiddenForest,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 4, { item: "Hair accessory", cost: { candles: 45 } })
			.set(1 << 12, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 13, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${expression} 3`, cost: { hearts: 3 } })
			.set(1 << 7, { item: `${expression} 4`, cost: { hearts: 6 } })
			.set(1 << 10, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 3, { item: "Hair", cost: { candles: 55 } })
			.set(1 << 9, { item: "Cape", cost: { candles: 70 } }),
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 12 } })
			.set(1 << 3, { item: "Hair", cost: null })
			.set(1 << 4, { item: "Hair accessory", cost: { seasonalCandles: 16 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 18 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 8, { item: "Trail spell 1", cost: { seasonalCandles: 24 } })
			.set(1 << 9, { item: "Cape", cost: null })
			.set(1 << 10, { item: "Music sheet", cost: { seasonalCandles: 28 } })
			.set(1 << 11, { item: "Trail spell 2", cost: null })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(94, skyDate(2_023, 8, 17)),
	},
});
