/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	SeasonalSpirit,
	SpiritName,
	Stance,
} from "../../Base.js";

const stance = Stance.Sassy;

export default new SeasonalSpirit({
	name: SpiritName.SassyDrifter,
	season: SeasonName.Gratitude,
	stance,
	realm: Realm.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null })
			.set(1 << 2, { item: "Hair", cost: { seasonalCandles: 6 } })
			.set(1 << 1, { item: "Blessing 1", cost: null })
			.set(1 << 5, { item: "Blessing 2", cost: { seasonalCandles: 8 } })
			.set(1 << 6, { item: "Weasel mask", cost: null }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${stance} stance`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 2, { item: "Hair", cost: { candles: 26 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: "Weasel mask", cost: { candles: 48 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(1, skyDate(2_020, 1, 31))
			.set(10, skyDate(2_020, 5, 28))
			.set(39, skyDate(2_021, 7, 8))
			.set(76, skyDate(2_022, 12, 8)),
	},
	keywords: ["weasel", "weasel mask"],
});
