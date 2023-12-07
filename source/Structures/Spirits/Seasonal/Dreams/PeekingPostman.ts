/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SEASON_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	Emote,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const emote = Emote.Peek;

export default new SeasonalSpirit({
	name: SpiritName.PeekingPostman,
	season: SeasonName.Dreams,
	emote,
	realm: Realm.ValleyOfTriumph,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: null })
			.set(1 << 2, { item: "Music sheet", cost: { seasonalCandles: 12 } })
			.set(1 << 3, { item: "Blessing 1", cost: null })
			.set(1 << 7, { item: `${emote} 3`, cost: { seasonalCandles: 16 } })
			.set(1 << 8, { item: `${emote} 4`, cost: null })
			.set(1 << 11, { item: "Outfit", cost: { seasonalCandles: 21 } })
			.set(1 << 10, { item: "Blessing 2", cost: null })
			.set(1 << 9, { item: "Cape", cost: { seasonalCandles: 27 } })
			.set(1 << 4, { item: "Rabbit mask", cost: null })
			.set(1 << 5, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.DreamsHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 4, { item: "Rabbit mask", cost: { candles: 54 } })
			.set(1 << 5, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 7, { item: `${emote} 3`, cost: { hearts: 3 } })
			.set(1 << 8, { item: `${emote} 4`, cost: { hearts: 6 } })
			.set(1 << 9, { item: "Cape", cost: { candles: 65 } })
			.set(1 << 10, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 11, { item: "Outfit", cost: { candles: 70 } }),
	},
	keywords: ["rabbit", "rabbit mask"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(64, skyDate(2_022, 6, 23)),
	},
});
