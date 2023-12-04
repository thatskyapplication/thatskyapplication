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
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.Acknowledge;

export default new SeasonalSpirit({
	name: SpiritName.SalutingProtector,
	season: SeasonName.Gratitude,
	emote,
	realm: Realm.GoldenWasteland,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: null })
			.set(1 << 3, { item: "Music sheet", cost: { seasonalCandles: 16 } })
			.set(1 << 2, { item: "Blessing", cost: null })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 18 } })
			.set(1 << 7, { item: `${emote} 4`, cost: null })
			.set(1 << 9, { item: "Cape", cost: { seasonalCandles: 20 } })
			.set(1 << 10, { item: "Mask", cost: { hearts: 5 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 } })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 } })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Cape", cost: { candles: 75 } })
			.set(1 << 10, { item: "Mask", cost: { candles: 42 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set("Error", skyDate(2_020, 5, 28))
			.set(53, skyDate(2_022, 1, 20)),
	},
});
