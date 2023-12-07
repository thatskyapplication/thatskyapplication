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

const action = FriendAction.PlayFight;
const actionEmoji = FRIEND_ACTIONS_EMOJIS.PlayFight;

export default new SeasonalSpirit({
	name: SpiritName.PlayfightingHerbalist,
	season: SeasonName.Enchantment,
	action,
	realm: Realm.GoldenWasteland,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: null })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 14 } })
			.set(1 << 5, { item: "Blessing 2", cost: null })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 16 } })
			.set(1 << 6, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 7, { item: "Music sheet", cost: { seasonalCandles: 18 } })
			.set(1 << 9, { item: "Hair", cost: null })
			.set(1 << 11, { item: "Cape", cost: { seasonalCandles: 20 } })
			.set(1 << 12, { item: "Blessing 4", cost: null })
			.set(1 << 3, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.EnchantmentHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 } })
			.set(1 << 2, { item: "Mask", cost: { candles: 30 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: `${action} 2`, cost: { hearts: 10 }, emoji: actionEmoji })
			.set(1 << 7, { item: "Music sheet", cost: { candles: 15 } })
			.set(1 << 8, { item: "Blessing 3", cost: { candles: 5 } })
			.set(1 << 9, { item: "Hair", cost: { candles: 42 } })
			.set(1 << 10, { item: "Orb", cost: { candles: 20 } })
			.set(1 << 11, { item: "Cape", cost: { candles: 70 } }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(47, skyDate(2_021, 10, 28))
			.set(98, skyDate(2_023, 10, 12)),
	},
});
