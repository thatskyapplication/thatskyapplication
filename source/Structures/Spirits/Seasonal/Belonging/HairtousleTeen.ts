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

const action = FriendAction.HairTousle;
const actionEmoji = FRIEND_ACTIONS_EMOJIS.HairTousle;

export default new SeasonalSpirit({
	name: SpiritName.HairtousleTeen,
	season: SeasonName.Belonging,
	action,
	realm: Realm.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 12 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 2, { item: "Music sheet", cost: { seasonalCandles: 14 } })
			.set(1 << 6, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 9, { item: "Blessing 3", cost: { seasonalCandles: 16 } })
			.set(1 << 8, { item: "Earmuffs", cost: null })
			.set(1 << 7, { item: "Ukelele", cost: { seasonalCandles: 18 } })
			.set(1 << 10, { item: "Blessing 4", cost: null })
			.set(1 << 3, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.BelongingHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 2, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: `${action} 2`, cost: { hearts: 9 }, emoji: actionEmoji })
			.set(1 << 7, { item: "Ukelele", cost: { candles: 70 } })
			.set(1 << 8, { item: "Earmuffs", cost: { candles: 50 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(11, skyDate(2_020, 6, 11))
			.set(63, skyDate(2_022, 6, 9)),
	},
});
