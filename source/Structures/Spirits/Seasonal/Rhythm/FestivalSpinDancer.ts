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

const expression = Expression.Dance;

export default new SeasonalSpirit({
	name: SpiritName.FestivalSpinDancer,
	season: Season.Rhythm,
	expression,
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Blessing", cost: { seasonalCandles: 10 } })
			.set(1 << 3, { item: "Music sheet", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 12 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 9, { item: "Hair", cost: { seasonalCandles: 14 } })
			.set(1 << 11, { item: "Outfit", cost: null })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${expression} 3`, cost: { hearts: 5 } })
			.set(1 << 7, { item: `${expression} 4`, cost: { hearts: 10 } })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Hair", cost: { candles: 34 } })
			.set(1 << 10, { item: "Prop", cost: { candles: 30 } })
			.set(1 << 11, { item: "Outfit", cost: { candles: 65 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(17, skyDate(2_020, 9, 3))
			.set(46, skyDate(2_021, 10, 14)),
	},
});
