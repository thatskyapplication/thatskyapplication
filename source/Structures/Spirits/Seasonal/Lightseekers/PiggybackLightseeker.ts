/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FRIEND_ACTIONS_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import {
	type ItemsData,
	type SeasonalSpiritVisitCollectionKey,
	FriendAction,
	SeasonalSpirit,
	SpiritName,
} from "../../Base.js";

const action = FriendAction.Carry;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const actionEmoji = FRIEND_ACTIONS_EMOJIS.Carry;
const maskEmoji = MASK_EMOJIS.Mask12;
const hairEmoji = HAIR_EMOJIS.Hair42;
const capeEmoji = CAPE_EMOJIS.Cape17;

export default new SeasonalSpirit({
	name: SpiritName.PiggybackLightseeker,
	season: SeasonName.Lightseekers,
	action,
	realm: Realm.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 16 }, emoji: maskEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 5, { item: "Blessing 2", cost: { seasonalCandles: 18 }, emoji: blessing2 })
			.set(1 << 6, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 7, { item: "Hair", cost: { seasonalCandles: 20 }, emoji: hairEmoji })
			.set(1 << 8, { item: "Cape", cost: null, emoji: capeEmoji }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { item: "Mask", cost: { candles: 24 }, emoji: maskEmoji })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 6, { item: `${action} 2`, cost: { hearts: 8 }, emoji: actionEmoji })
			.set(1 << 7, { item: "Hair", cost: { candles: 26 }, emoji: hairEmoji })
			.set(1 << 8, { item: "Cape", cost: { candles: 60 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(7, skyDate(2_020, 4, 16))
			.set(30, skyDate(2_021, 3, 4))
			.set(80, skyDate(2_023, 2, 2)),
	},
});
