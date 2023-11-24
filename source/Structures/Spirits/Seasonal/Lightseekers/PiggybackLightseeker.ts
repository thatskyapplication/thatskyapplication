/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	FriendAction,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const action = FriendAction.Carry;

export default new SeasonalSpirit({
	name: SpiritName.PiggybackLightseeker,
	season: SeasonName.Lightseekers,
	action,
	realm: Realm.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 16 } })
			.set(1 << 1, { item: "Blessing 1", cost: null })
			.set(1 << 5, { item: "Blessing 2", cost: { seasonalCandles: 18 } })
			.set(1 << 6, { item: `${action} 2`, cost: null })
			.set(1 << 7, { item: "Hair", cost: { seasonalCandles: 20 } })
			.set(1 << 8, { item: "Cape", cost: null }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 2, { item: "Mask", cost: { candles: 24 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: `${action} 2`, cost: { hearts: 8 } })
			.set(1 << 7, { item: "Hair", cost: { candles: 26 } })
			.set(1 << 8, { item: "Cape", cost: { candles: 60 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(7, skyDate(2_020, 4, 16))
			.set(30, skyDate(2_021, 3, 4))
			.set(80, skyDate(2_023, 2, 2)),
	},
});
