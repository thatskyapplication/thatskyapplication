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

const expression = Expression.HandRub;

export default new SeasonalSpirit({
	name: SpiritName.StarCollector,
	season: Season.LittlePrince,
	expression,
	realm: Realm.VaultOfKnowledge,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Necktie", cost: { seasonalCandles: 12 } })
			.set(1 << 3, { item: "Blessing 1", cost: null })
			.set(1 << 4, { item: `${expression} 3`, cost: { seasonalCandles: 16 } })
			.set(1 << 5, { item: `${expression} 4`, cost: null })
			.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 20 } })
			.set(1 << 7, { item: "Cape", cost: null })
			.set(1 << 8, { item: "Prop", cost: { seasonalCandles: 24 } })
			.set(1 << 9, { item: "Blessing 3", cost: null })
			.set(1 << 10, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
			.set(1 << 10, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 2, { item: "Necktie", cost: { candles: 40 } })
			.set(1 << 11, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 4, { item: `${expression} 3`, cost: { hearts: 3 } })
			.set(1 << 5, { item: `${expression} 4`, cost: { hearts: 6 } })
			.set(1 << 6, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 7, { item: "Cape", cost: { candles: 75 } })
			.set(1 << 8, { item: "Prop", cost: { candles: 70 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(96, skyDate(2_023, 9, 14)),
	},
});
