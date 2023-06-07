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

const expression = Expression.Greeting;

export default new SeasonalSpirit({
	name: SpiritName.GreetingShaman,
	season: Season.Gratitude,
	expression,
	realm: Realm.VaultOfKnowledge,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
		.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
		.set(1 << 3, { item: "Large bell", cost: { candles: 45 } })
		.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
		.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
		.set(1 << 6, { item: `${expression} 3`, cost: { hearts: 3 } })
		.set(1 << 7, { item: `${expression} 4`, cost: { hearts: 6 } })
		.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
		.set(1 << 9, { item: "Mask", cost: { candles: 54 } }),
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(14, skyDate(2_020, 7, 23))
			.set(62, skyDate(2_022, 5, 26)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
