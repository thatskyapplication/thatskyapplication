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

const stance = Stance.Wise;

export default new SeasonalSpirit({
	name: SpiritName.WiseGrandparent,
	season: SeasonName.Belonging,
	stance,
	realm: Realm.VaultOfKnowledge,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null })
			.set(1 << 3, { item: "Blessing 1", cost: { seasonalCandles: 10 } })
			.set(1 << 1, { item: "Music sheet", cost: null })
			.set(1 << 5, { item: "Blessing 2", cost: { seasonalCandles: 12 } })
			.set(1 << 9, { item: "Blessing 3", cost: null })
			.set(1 << 8, { item: "Mask", cost: { seasonalCandles: 14 } })
			.set(1 << 10, { item: "Blessing 4", cost: null })
			.set(1 << 11, { item: "Blessing 5", cost: { seasonalCandles: 16 } })
			.set(1 << 6, { item: "Cape", cost: null })
			.set(1 << 2, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null })
			.set(1 << 1, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 2, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: "Cape", cost: { candles: 70 } })
			.set(1 << 7, { item: "Prop", cost: { candles: 10 } })
			.set(1 << 8, { item: "Mask", cost: { candles: 48 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(15, skyDate(2_020, 8, 6))
			.set(48, skyDate(2_021, 11, 11))
			.set(100, skyDate(2_023, 11, 9)),
	},
});
