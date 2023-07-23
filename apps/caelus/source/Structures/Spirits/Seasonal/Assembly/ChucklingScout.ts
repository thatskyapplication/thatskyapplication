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

const expression = Expression.Chuckle;

export default new SeasonalSpirit({
	name: SpiritName.ChucklingScout,
	season: Season.Assembly,
	expression,
	realm: Realm.HiddenForest,
	hasSeasonalInfographic: false,
	seasonalOffer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: null })
		.set(1 << 3, { item: "Mask", cost: { seasonalCandles: 12 } })
		.set(1 << 2, { item: "Blessing 1", cost: null })
		.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 14 } })
		.set(1 << 7, { item: `${expression} 4`, cost: null })
		.set(1 << 9, { item: "Blessing 2", cost: { seasonalCandles: 17 } })
		.set(1 << 8, { item: "Outfit", cost: null })
		.set(1 << 10, { item: "Prop", cost: { seasonalCandles: 20 } })
		.set(1 << 11, { item: "Blessing 3", cost: null })
		.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
		.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
		.set(1 << 3, { item: "Mask", cost: { candles: 36 } })
		.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
		.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
		.set(1 << 6, { item: `${expression} 3`, cost: { hearts: 3 } })
		.set(1 << 7, { item: `${expression} 4`, cost: { hearts: 6 } })
		.set(1 << 8, { item: "Outfit", cost: { candles: 65 } })
		.set(1 << 9, { item: "Blessing 2", cost: { candles: 5 } })
		.set(1 << 10, { item: "Prop", cost: { candles: 45 } }),
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(1, skyDate(2_023, 3, 6)),
	},
});
