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

const expression = Expression.Balance;

export default new SeasonalSpirit({
	name: SpiritName.ProphetOfAir,
	season: Season.Prophecy,
	expression,
	realm: Realm.IslesOfDawn,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 3 } })
		.set(1 << 2, { item: "Prop", cost: { candles: 15 } })
		.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 } })
		.set(1 << 4, { item: "Hair", cost: { candles: 44 } })
		.set(1 << 5, { item: "Heart", cost: { candles: 3 } })
		.set(1 << 6, { item: "Wing buff", cost: { ascendedCandles: 2 } })
		.set(1 << 7, { item: `${expression} 3`, cost: { hearts: 3 } })
		.set(1 << 8, { item: `${expression} 4`, cost: { hearts: 6 } })
		.set(1 << 9, { item: "Mask", cost: { candles: 54 } })
		.set(1 << 10, { item: "Blessing 2", cost: { candles: 5 } })
		.set(1 << 11, { item: "Cape", cost: { candles: 75 } }),
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(61, skyDate(2_022, 5, 12)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(2, skyDate(2_023, 5, 15)),
	},
});
