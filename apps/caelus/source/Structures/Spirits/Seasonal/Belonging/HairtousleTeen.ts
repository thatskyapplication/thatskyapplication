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

const expression = Expression.HairTousle;

export default new SeasonalSpirit({
	name: SpiritName.HairtousleTeen,
	season: Season.Belonging,
	expression,
	realm: Realm.HiddenForest,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
		.set(1 << 2, { item: "Music sheet", cost: { candles: 15 } })
		.set(1 << 3, { item: "Heart", cost: { candles: 3 } })
		.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
		.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
		.set(1 << 6, { item: `${expression} 2`, cost: { hearts: 9 } })
		.set(1 << 7, { item: "Ukelele", cost: { candles: 70 } })
		.set(1 << 8, { item: "Earmuffs", cost: { candles: 50 } }),
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(11, skyDate(2_020, 6, 11))
			.set(63, skyDate(2_022, 6, 9)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
