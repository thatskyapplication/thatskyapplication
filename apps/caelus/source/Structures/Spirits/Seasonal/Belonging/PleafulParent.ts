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

const expression = Expression.DontGo;

export default new SeasonalSpirit({
	name: SpiritName.PleafulParent,
	season: Season.Belonging,
	expression: Expression.DontGo,
	realm: Realm.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Blessing", cost: { seasonalCandles: 14 } })
			.set(1 << 10, { item: "Guitar", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 16 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 3, { item: "Mask", cost: { seasonalCandles: 18 } })
			.set(1 << 9, { item: "Cape", cost: null })
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
			.set(1 << 9, { item: "Cape", cost: { candles: 65 } })
			.set(1 << 10, { item: "Guitar", cost: { candles: 75 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(5, skyDate(2_020, 3, 26))
			.set(24, skyDate(2_020, 12, 10))
			.set(77, skyDate(2_022, 12, 22)),
	},
});
