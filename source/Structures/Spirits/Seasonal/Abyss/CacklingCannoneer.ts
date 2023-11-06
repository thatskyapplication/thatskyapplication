/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Expression,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const expression = Expression.EvilLaugh;

export default new SeasonalSpirit({
	name: SpiritName.CacklingCannoneer,
	season: Season.Abyss,
	expression,
	realm: Realm.GoldenWasteland,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 4, { item: "Mask", cost: { candles: 40 } })
			.set(1 << 12, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 13, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${expression} 3`, cost: { hearts: 3 } })
			.set(1 << 7, { item: `${expression} 4`, cost: { hearts: 6 } })
			.set(1 << 11, { item: "Hair", cost: { candles: 50 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 8, { item: "Cape", cost: { candles: 70 } })
			.set(1 << 3, { item: "Music sheet", cost: { candles: 15 } }),
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 12 } })
			.set(1 << 3, { item: "Music sheet", cost: null })
			.set(1 << 4, { item: "Mask", cost: { seasonalCandles: 16 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 20 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 8, { item: "Cape", cost: { seasonalCandles: 26 } })
			.set(1 << 9, { item: "Blessing 3", cost: null })
			.set(1 << 10, { item: "Blessing 4", cost: { seasonalCandles: 34 } })
			.set(1 << 11, { item: "Hair", cost: null })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
	visits: {
		returning: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(4, skyDate(2_023, 8, 7)),
	},
});
