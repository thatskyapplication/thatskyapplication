/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	SeasonalSpirit,
	SpiritName,
	Stance,
} from "../../Base.js";

const stance = Stance.Laidback;

export default new SeasonalSpirit({
	name: SpiritName.LaidbackPioneer,
	season: SeasonName.Lightseekers,
	stance,
	realm: Realm.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 6 } })
			.set(1 << 1, { item: "Blessing 1", cost: null })
			.set(1 << 5, { item: "Blessing 2", cost: { seasonalCandles: 8 } })
			.set(1 << 6, { item: "Music sheet", cost: null })
			.set(1 << 7, { item: "Hair", cost: { seasonalCandles: 10 } })
			.set(1 << 9, { item: "Blessing 3", cost: null })
			.set(1 << 10, { item: "Blessing 4", cost: { seasonalCandles: 20 } })
			.set(1 << 8, { item: "Umbrella", cost: null }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 2, { item: "Mask", cost: { candles: 30 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 7, { item: "Hair", cost: { candles: 18 } })
			.set(1 << 8, { item: "Umbrella", cost: { candles: 75 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(3, skyDate(2_020, 2, 27))
			.set(23, skyDate(2_020, 11, 26))
			.set(72, skyDate(2_022, 10, 13)),
	},
	hasMarketingVideo: true,
	keywords: ["umbrella"],
});
