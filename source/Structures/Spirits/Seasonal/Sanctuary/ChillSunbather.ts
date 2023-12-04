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

const emote = Emote.BellyScratch;

export default new SeasonalSpirit({
	name: SpiritName.ChillSunbather,
	season: SeasonName.Sanctuary,
	emote,
	realm: Realm.DaylightPrairie,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: null })
			.set(1 << 3, { item: "Blessing 1", cost: { seasonalCandles: 16 } })
			.set(1 << 4, { item: "Face accessory", cost: null })
			.set(1 << 7, { item: `${emote} 3`, cost: { seasonalCandles: 18 } })
			.set(1 << 8, { item: `${emote} 4`, cost: null })
			.set(1 << 9, { item: "Hair", cost: { seasonalCandles: 20 } })
			.set(1 << 10, { item: "Blessing 2", cost: null })
			.set(1 << 11, { item: "Cape", cost: { seasonalCandles: 22 } })
			.set(1 << 12, { item: "Blessing 3", cost: null })
			.set(1 << 5, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Sunlounger", cost: { candles: 20 } })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 4, { item: "Face accessory", cost: { candles: 66 } })
			.set(1 << 5, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 7, { item: `${emote} 3`, cost: { hearts: 3 } })
			.set(1 << 8, { item: `${emote} 4`, cost: { hearts: 6 } })
			.set(1 << 9, { item: "Hair", cost: { candles: 44 } })
			.set(1 << 10, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 11, { item: "Cape", cost: { candles: 70 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(42, skyDate(2_021, 8, 19))
			.set(104, skyDate(2_024, 1, 4)),
	},
});
