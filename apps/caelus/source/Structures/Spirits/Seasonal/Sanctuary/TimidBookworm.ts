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

const stance = Stance.Timid;

export default new SeasonalSpirit({
	name: SpiritName.TimidBookworm,
	season: Season.Sanctuary,
	stance,
	realm: Realm.DaylightPrairie,
	offer: new Collection<number, ItemsData>()
		.set(1 << 0, { item: `${stance} stance`, cost: null })
		.set(1 << 1, { item: "Music sheet", cost: { candles: 15 } })
		.set(1 << 2, { item: "Blessing", cost: { candles: 5 } })
		.set(1 << 3, { item: "Hair", cost: { candles: 42 } })
		.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
		.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
		.set(1 << 6, { item: "Blessing 2", cost: { candles: 5 } })
		.set(1 << 7, { item: "Cape", cost: { candles: 70 } }),
	keywords: ["butterfly", "butterfly cape"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
			.set(37, skyDate(2_021, 6, 10))
			.set(65, skyDate(2_022, 7, 7)),
		returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
	},
});
