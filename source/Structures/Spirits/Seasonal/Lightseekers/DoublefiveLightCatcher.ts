/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Expression,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const expression = Expression.DoubleFive;

export default new SeasonalSpirit({
	name: SpiritName.DoublefiveLightCatcher,
	season: SeasonName.Lightseekers,
	expression: Expression.DoubleFive,
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 4 } })
			.set(1 << 8, { item: "Hair", cost: null })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 6 } })
			.set(1 << 6, { item: `${expression} 2`, cost: null })
			.set(1 << 5, { item: "Blessing 2", cost: { seasonalCandles: 8 } })
			.set(1 << 7, { item: "Flute", cost: null }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 2, { item: "Mask", cost: { candles: 24 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: `${expression} 2`, cost: { hearts: 7 } })
			.set(1 << 7, { item: "Flute", cost: { candles: 55 } })
			.set(1 << 8, { item: "Hair", cost: { candles: 34 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(2, skyDate(2_020, 2, 14))
			.set(33, skyDate(2_021, 4, 15))
			.set(66, skyDate(2_022, 7, 21)),
	},
});
