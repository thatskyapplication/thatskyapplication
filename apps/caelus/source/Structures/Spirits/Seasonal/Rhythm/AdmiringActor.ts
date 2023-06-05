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

const expression = Expression.BlowKiss;

export default new SeasonalSpirit({
	name: SpiritName.AdmiringActor,
	season: Season.Rhythm,
	expression,
	realm: Realm.HiddenForest,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
		.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
		.set(1 << 3, { item: "Music sheet", cost: { candles: 15 } })
		.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
		.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
		.set(1 << 6, { item: `${expression} 3`, cost: { hearts: 3 } })
		.set(1 << 7, { item: `${expression} 4`, cost: { hearts: 6 } })
		.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
		.set(1 << 9, { item: "Outfit", cost: { candles: 65 } })
		.set(1 << 10, { item: "Mask", cost: { candles: 42 } }),
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(20, skyDate(2_020, 10, 15))
			.set(38, skyDate(2_021, 6, 24)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
