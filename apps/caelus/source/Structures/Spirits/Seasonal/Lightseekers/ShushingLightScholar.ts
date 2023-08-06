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

const expression = Expression.Shush;

export default new SeasonalSpirit({
	name: SpiritName.ShushingLightScholar,
	season: Season.Lightseekers,
	expression,
	realm: Realm.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 16 } })
			.set(1 << 3, { item: "Mask", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 18 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 8, { item: "Blessing 2", cost: { seasonalCandles: 20 } })
			.set(1 << 9, { item: "Cape", cost: null }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Mask", cost: { candles: 30 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${expression} 3`, cost: { hearts: 3 } })
			.set(1 << 7, { item: `${expression} 4`, cost: { hearts: 6 } })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Cape", cost: { candles: 65 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(16, skyDate(2_020, 8, 20))
			.set(70, skyDate(2_022, 9, 15)),
	},
});
