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

const expression = Expression.PlayFight;

export default new SeasonalSpirit({
	name: SpiritName.PlayfightingHerbalist,
	season: Season.Enchantment,
	expression,
	realm: Realm.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: null })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 14 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 16 } })
			.set(1 << 6, { item: `${expression} 2`, cost: null })
			.set(1 << 7, { item: "Music sheet", cost: { seasonalCandles: 18 } })
			.set(1 << 9, { item: "Hair", cost: null })
			.set(1 << 11, { item: "Cape", cost: { seasonalCandles: 20 } })
			.set(1 << 12, { item: "Blessing 4", cost: null })
			.set(1 << 3, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${expression} 1`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 2, { item: "Mask", cost: { candles: 30 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: `${expression} 2`, cost: { hearts: 10 } })
			.set(1 << 7, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 8, { item: "Blessing 3", cost: { candles: 5 } })
			.set(1 << 9, { item: "Hair", cost: { candles: 42 } })
			.set(1 << 10, { item: "Orb", cost: { candles: 20 } })
			.set(1 << 11, { item: "Cape", cost: { candles: 70 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(47, skyDate(2_021, 10, 28)),
	},
});
