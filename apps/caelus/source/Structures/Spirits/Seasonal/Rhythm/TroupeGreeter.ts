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

const expression = Expression.Welcome;

export default new SeasonalSpirit({
	name: SpiritName.TroupeGreeter,
	season: Season.Rhythm,
	expression,
	realm: Realm.IslesOfDawn,
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
		.set(1 << 9, { item: "Outfit", cost: { candles: 70 } })
		.set(1 << 10, { item: "Mask", cost: { candles: 48 } }),
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(25, skyDate(2_020, 12, 24))
			.set(56, skyDate(2_022, 3, 3)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(4, skyDate(2_023, 8, 7)),
	},
});
