/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SEASON_EMOJIS, FRIEND_ACTIONS_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	FriendAction,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const action = FriendAction.Bearhug;
const actionEmoji = FRIEND_ACTIONS_EMOJIS.Bearhug;

export default new SeasonalSpirit({
	name: SpiritName.BearhugHermit,
	season: SeasonName.Dreams,
	action,
	realm: Realm.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 2, { item: "Blessing 1", cost: { seasonalCandles: 13 } })
			.set(1 << 3, { item: "Red horns", cost: null })
			.set(1 << 6, { item: "Blessing 2", cost: { seasonalCandles: 18 } })
			.set(1 << 1, { item: "Music sheet", cost: null })
			.set(1 << 10, { item: "Blessing 3", cost: { seasonalCandles: 23 } })
			.set(1 << 7, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 8, { item: "Hair", cost: { seasonalCandles: 29 } })
			.set(1 << 9, { item: "Outfit", cost: null })
			.set(1 << 4, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.DreamsHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 3, { item: "Red horns", cost: { candles: 42 } })
			.set(1 << 4, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 6, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 7, { item: `${action} 2`, cost: { hearts: 8 }, emoji: actionEmoji })
			.set(1 << 8, { item: "Hair", cost: { candles: 50 } })
			.set(1 << 9, { item: "Outfit", cost: { candles: 70 } }),
	},
	keywords: ["yeti"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>().set(75, skyDate(2_022, 11, 24)),
	},
});
