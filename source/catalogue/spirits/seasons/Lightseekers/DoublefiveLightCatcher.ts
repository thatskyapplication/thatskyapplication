import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { HAIR_EMOJIS, HELD_PROPS_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const action = FriendAction.DoubleFive;
const actionEmoji = FriendActionToEmoji[action];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask13;
const hairEmoji = HAIR_EMOJIS.Hair44;
const heldProp = HELD_PROPS_EMOJIS.HeldProp09;

export default new SeasonalSpirit({
	name: SpiritName.DoublefiveLightCatcher,
	season: SeasonName.Lightseekers,
	action,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { seasonalCandles: 4 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 8, emoji: hairEmoji },
			{ name: "Mask", bit: 1 << 2, cost: { seasonalCandles: 6 }, emoji: maskEmoji },
			{ name: `${action} 2`, bit: 1 << 6, emoji: actionEmoji },
			{ name: "Blessing 2", bit: 1 << 5, cost: { seasonalCandles: 8 }, emoji: blessing2 },
			{ name: "Flute", bit: 1 << 7, emoji: heldProp },
		],
		current: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 2, cost: { candles: 24 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 4, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing2 },
			{ name: `${action} 2`, bit: 1 << 6, cost: { hearts: 7 }, emoji: actionEmoji },
			{ name: "Flute", bit: 1 << 7, cost: { candles: 55 }, emoji: heldProp },
			{ name: "Hair", bit: 1 << 8, cost: { candles: 34 }, emoji: hairEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(2, skyDate(2_020, 2, 14))
			.set(33, skyDate(2_021, 4, 15))
			.set(66, skyDate(2_022, 7, 21))
			.set(114, skyDate(2_024, 5, 23)),
	},
});
