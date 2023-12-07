/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { SEASON_EMOJIS } from "../../../../Utility/emojis.js";
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

const emote = Emote.Grateful;

export default new SeasonalSpirit({
	name: SpiritName.GratefulShellCollector,
	season: SeasonName.Sanctuary,
	emote,
	realm: Realm.DaylightPrairie,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: null })
			.set(1 << 3, { item: "Blessing 1", cost: { seasonalCandles: 14 } })
			.set(1 << 4, { item: "Hair", cost: null })
			.set(1 << 7, { item: `${emote} 3`, cost: { seasonalCandles: 16 } })
			.set(1 << 8, { item: `${emote} 4`, cost: null })
			.set(1 << 10, { item: "Cape", cost: { seasonalCandles: 18 } })
			.set(1 << 9, { item: "Blessing 2", cost: null })
			.set(1 << 5, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.SanctuaryHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${emote} 1`, cost: null })
			.set(1 << 1, { item: `${emote} 2`, cost: { hearts: 4 } })
			.set(1 << 2, { item: "Chairs", cost: { candles: 45 } })
			.set(1 << 3, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 4, { item: "Hair", cost: { candles: 34 } })
			.set(1 << 5, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 6, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 7, { item: `${emote} 3`, cost: { hearts: 3 } })
			.set(1 << 8, { item: `${emote} 4`, cost: { hearts: 6 } })
			.set(1 << 9, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 10, { item: "Cape", cost: { candles: 70 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(45, skyDate(2_021, 9, 30))
			.set(88, skyDate(2_023, 5, 25)),
	},
});
