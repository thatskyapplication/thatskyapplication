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

const expression = Expression.Grouchy;

export default new SeasonalSpirit({
	name: SpiritName.HikingGrouch,
	season: Season.Sanctuary,
	expression,
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 3, { item: "Blessing 1", cost: { seasonalCandles: 12 } })
			.set(1 << 4, { item: "Mask", cost: null })
			.set(1 << 7, { item: `${expression} 3`, cost: { seasonalCandles: 14 } })
			.set(1 << 8, { item: `${expression} 4`, cost: null })
			.set(1 << 9, { item: "Hair", cost: { seasonalCandles: 16 } })
			.set(1 << 10, { item: "Blessing 2", cost: null })
			.set(1 << 12, { item: "Blessing 3", cost: { seasonalCandles: 18 } })
			.set(1 << 11, { item: "Bow tie", cost: null })
			.set(1 << 5, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Beach chairs", cost: { hearts: 16 } })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 4, { item: "Mask", cost: { candles: 34 } })
			.set(1 << 5, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 6, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 7, { item: `${expression} 3`, cost: { hearts: 3 } })
			.set(1 << 8, { item: `${expression} 4`, cost: { hearts: 6 } })
			.set(1 << 9, { item: "Hair", cost: { candles: 42 } })
			.set(1 << 10, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 11, { item: "Bow tie", cost: { candles: 50 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(55, skyDate(2_022, 2, 17)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(4, skyDate(2_023, 8, 7)),
	},
});
