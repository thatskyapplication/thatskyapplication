/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import {
	type SeasonalSpiritVisitCollectionKey,
	SeasonalSpirit,
	SpiritName,
	Expression,
	type ItemsData,
} from "../../Base.js";

const expression = Expression.DoubleFive;

export default new SeasonalSpirit({
	name: SpiritName.DoublefiveLightCatcher,
	season: Season.Lightseekers,
	expression: Expression.DoubleFive,
	realm: Realm.DaylightPrairie,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${expression} 1`, cost: null })
		.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
		.set(1 << 2, { item: "Mask", cost: { candles: 24 } })
		.set(1 << 3, { item: "Heart", cost: { candles: 3 } })
		.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
		.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
		.set(1 << 6, { item: `${expression} 2`, cost: { hearts: 7 } })
		.set(1 << 7, { item: "Flute", cost: { candles: 55 } })
		.set(1 << 8, { item: "Hair", cost: { candles: 34 } }),
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(2, skyDate(2_020, 2, 14))
			.set(33, skyDate(2_021, 4, 15))
			.set(66, skyDate(2_022, 7, 21)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
