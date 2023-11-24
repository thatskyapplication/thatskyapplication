/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.Confetti;

export default new SeasonalSpirit({
	name: SpiritName.ConfettiCousin,
	season: SeasonName.Belonging,
	emote,
	realm: Realm.DaylightPrairie,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: null })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 8 } })
			.set(1 << 8, { item: "Blessing 2", cost: null })
			.set(1 << 6, { item: `${emote} 3`, cost: { seasonalCandles: 10 } })
			.set(1 << 7, { item: `${emote} 4`, cost: null })
			.set(1 << 9, { item: "Cape", cost: { seasonalCandles: 12 } })
			.set(1 << 3, { item: "Hair", cost: null })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 } }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Hair", cost: { candles: 42 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: `${emote} 3`, cost: { hearts: 3 } })
			.set(1 << 7, { item: `${emote} 4`, cost: { hearts: 6 } })
			.set(1 << 8, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 9, { item: "Cape", cost: { candles: 60 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(13, skyDate(2_020, 7, 9))
			.set(27, skyDate(2_021, 1, 21))
			.set(97, skyDate(2_023, 9, 28)),
	},
});
