import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import {
	SeasonalSpirit,
	type SeasonalSpiritVisitCollectionKey,
} from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const action = FriendAction.Carry;
const actionEmoji = FriendActionToEmoji[action];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask12;
const hairEmoji = HAIR_EMOJIS.Hair42;
const capeEmoji = CAPE_EMOJIS.Cape17;

export default new SeasonalSpirit({
	name: SpiritName.PiggybackLightseeker,
	season: SeasonName.Lightseekers,
	action,
	realm: RealmName.IslesOfDawn,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Mask", bit: 1 << 2, cost: { seasonalCandles: 16 }, emoji: maskEmoji },
			{ name: "Blessing 1", bit: 1 << 1, emoji: blessing2 },
			{ name: "Blessing 2", bit: 1 << 5, cost: { seasonalCandles: 18 }, emoji: blessing2 },
			{ name: `${action} 2`, bit: 1 << 6, emoji: actionEmoji },
			{ name: "Hair", bit: 1 << 7, cost: { seasonalCandles: 20 }, emoji: hairEmoji },
			{ name: "Cape", bit: 1 << 8, emoji: capeEmoji },
		],
		current: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 2, cost: { candles: 24 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 4,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing2 },
			{ name: `${action} 2`, bit: 1 << 6, cost: { hearts: 8 }, emoji: actionEmoji },
			{ name: "Hair", bit: 1 << 7, cost: { candles: 26 }, emoji: hairEmoji },
			{ name: "Cape", bit: 1 << 8, cost: { candles: 60 }, emoji: capeEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(7, skyDate(2_020, 4, 16))
			.set(30, skyDate(2_021, 3, 4))
			.set(80, skyDate(2_023, 2, 2)),
	},
});
