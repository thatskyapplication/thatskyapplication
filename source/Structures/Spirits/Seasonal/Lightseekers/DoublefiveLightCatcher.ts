/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { Realm } from "../../../../Utility/Constants.js";
import { skyDate } from "../../../../Utility/dates.js";
import { HAIR_EMOJIS, HELD_PROPS_EMOJIS, MASK_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../Base.js";

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
	realm: Realm.DaylightPrairie,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 4 }, emoji: blessing2 })
			.set(1 << 8, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 6 }, emoji: maskEmoji })
			.set(1 << 6, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 5, { item: "Blessing 2", cost: { seasonalCandles: 8 }, emoji: blessing2 })
			.set(1 << 7, { item: "Flute", cost: null, emoji: heldProp }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { item: "Mask", cost: { candles: 24 }, emoji: maskEmoji })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 6, { item: `${action} 2`, cost: { hearts: 7 }, emoji: actionEmoji })
			.set(1 << 7, { item: "Flute", cost: { candles: 55 }, emoji: heldProp })
			.set(1 << 8, { item: "Hair", cost: { candles: 34 }, emoji: hairEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(2, skyDate(2_020, 2, 14))
			.set(33, skyDate(2_021, 4, 15))
			.set(66, skyDate(2_022, 7, 21)),
	},
});
