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

const expression = Expression.Grateful;

export default new SeasonalSpirit({
	name: SpiritName.GratefulShellCollector,
	season: Season.Sanctuary,
	expression,
	realm: Realm.DaylightPrairie,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 3, { item: "Blessing 1", cost: { seasonalCandles: 14 } })
			.set(1 << 4, { item: "Hair", cost: null })
			.set(1 << 7, { item: `${expression} 3`, cost: { seasonalCandles: 16 } })
			.set(1 << 8, { item: `${expression} 4`, cost: null })
			.set(1 << 10, { item: "Cape", cost: { seasonalCandles: 18 } })
			.set(1 << 9, { item: "Blessing 2", cost: null })
			.set(1 << 5, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Chairs", cost: { candles: 45 } })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 4, { item: "Hair", cost: { candles: 34 } })
			.set(1 << 5, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 6, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 7, { item: `${expression} 3`, cost: { hearts: 3 } })
			.set(1 << 8, { item: `${expression} 4`, cost: { hearts: 6 } })
			.set(1 << 9, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 10, { item: "Cape", cost: { candles: 70 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(45, skyDate(2_021, 9, 30))
			.set(88, skyDate(2_023, 5, 25)),
	},
});
