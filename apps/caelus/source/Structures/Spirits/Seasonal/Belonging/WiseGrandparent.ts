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

const stance = Stance.Wise;

export default new SeasonalSpirit({
	name: SpiritName.WiseGrandparent,
	season: Season.Belonging,
	stance,
	realm: Realm.VaultOfKnowledge,
	offer: new Collection<number, ItemsData>()
	.set(1 << 0, { item: `${stance} stance`, cost: null })
	.set(1 << 1, { item: "Music sheet", cost: { candles: 15 } })
	.set(1 << 2, { item: "Heart", cost: { candles: 3 } })
	.set(1 << 3, { item: "Blessing", cost: { candles: 5 } })
	.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
	.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
	.set(1 << 6, { item: "Cape", cost: { candles: 70 } })
	.set(1 << 8, { item: "Prop", cost: { candles: 10 } })
	.set(1 << 7, { item: "Mask", cost: { candles: 48 } }),
		visits: {
			travelling: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>()
				.set(15, skyDate(2_020, 8, 6))
				.set(48, skyDate(2_021, 11, 11)),
			returning: new Collection<SeasonalSpiritVisitCollectionKey, Dayjs>(),
		},
});
