/* eslint-disable unicorn/prefer-math-trunc */
import type { Dayjs } from "dayjs";
import { Collection } from "discord.js";
import { Realm, Season } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/Utility.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	SeasonalSpirit,
	SpiritName,
	Stance,
} from "../../Base.js";

const stance = Stance.Tinker;

export default new SeasonalSpirit({
	name: SpiritName.TinkeringChimesmith,
	season: Season.Flight,
	stance,
	realm: Realm.HiddenForest,
	hasMarketingVideo: true,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${stance} stance`, cost: null })
		.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
		.set(1 << 2, { item: "Hair", cost: { candles: 45 } })
		.set(1 << 3, { item: "Heart", cost: { candles: 3 } })
		.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
		.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
		.set(1 << 6, { item: "Hair accessory", cost: { candles: 35 } })
		.set(1 << 7, { item: "Outfit", cost: { candles: 70 } })
		.set(1 << 8, { item: "Kalimba", cost: { candles: 75 } }),
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>().set(87, skyDate(2_023, 5, 11)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
