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

const expression = Expression.Thinking;

export default new SeasonalSpirit({
	name: SpiritName.ThoughtfulDirector,
	season: Season.Rhythm,
	expression,
	realm: Realm.VaultOfKnowledge,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 16 } })
			.set(1 << 3, { item: "Mask", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 18 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 9, { item: "Xylophone", cost: { seasonalCandles: 20 } })
			.set(1 << 8, { item: "Blessing 2", cost: null })
			.set(1 << 11, { item: "Blessing 3", cost: { seasonalCandles: 22 } })
			.set(1 << 10, { item: "Cape", cost: null })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Mask", cost: { candles: 42 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${expression} 3`, cost: { hearts: 3 } })
			.set(1 << 7, { item: `${expression} 4`, cost: { hearts: 6 } })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Xylophone", cost: { candles: 65 } })
			.set(1 << 10, { item: "Cape", cost: { candles: 75 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(35, skyDate(2_021, 5, 13))
			.set(67, skyDate(2_022, 8, 4)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(3, skyDate(2_023, 7, 3)),
	},
});
