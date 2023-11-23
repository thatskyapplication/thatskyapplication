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

const expression = Expression.Voilà;

export default new SeasonalSpirit({
	name: SpiritName.TalentedBuilder,
	season: SeasonName.Flight,
	expression,
	realm: Realm.HiddenForest,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 4, { item: "Neck accessory", cost: { candles: 40 } })
			.set(1 << 12, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 13, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${expression} 3`, cost: { hearts: 3 } })
			.set(1 << 7, { item: `${expression} 4`, cost: { hearts: 6 } })
			.set(1 << 3, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Outfit", cost: { candles: 70 } })
			.set(1 << 10, { item: "Hair", cost: { candles: 45 } }),
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: `${expression} 2`, cost: null })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 10 } })
			.set(1 << 3, { item: "Music sheet", cost: null })
			.set(1 << 4, { item: "Neck accessory", cost: { seasonalCandles: 16 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 6, { item: `${expression} 3`, cost: { seasonalCandles: 22 } })
			.set(1 << 7, { item: `${expression} 4`, cost: null })
			.set(1 << 8, { item: "Trail spell 1", cost: { seasonalCandles: 24 } })
			.set(1 << 9, { item: "Outfit", cost: null })
			.set(1 << 10, { item: "Hair", cost: { seasonalCandles: 26 } })
			.set(1 << 11, { item: "Trail spell 2", cost: null })
			.set(1 << 12, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(101, skyDate(2_023, 11, 23)),
	},
});
