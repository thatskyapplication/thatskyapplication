/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type ItemsData, type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../Structures/Spirits.js";
import { RealmName } from "../../../Utility/Constants.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../Utility/spirits.js";

const action = FriendAction.PlayFight;
const actionEmoji = FriendActionToEmoji[action];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask28;
const hairEmoji = HAIR_EMOJIS.Hair58;
const capeEmoji = CAPE_EMOJIS.Cape28;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp19;

export default new SeasonalSpirit({
	name: SpiritName.PlayfightingHerbalist,
	season: SeasonName.Enchantment,
	action,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing2 })
			.set(1 << 2, { item: "Mask", cost: { seasonalCandles: 14 }, emoji: maskEmoji })
			.set(1 << 5, { item: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 8, { item: "Blessing 3", cost: { seasonalCandles: 16 }, emoji: blessing2 })
			.set(1 << 6, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 7, { item: "Music sheet", cost: { seasonalCandles: 18 }, emoji: musicSheet })
			.set(1 << 9, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 11, { item: "Cape", cost: { seasonalCandles: 20 }, emoji: capeEmoji })
			.set(1 << 12, { item: "Blessing 4", cost: null, emoji: blessing2 })
			.set(1 << 3, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.EnchantmentHeart }),
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { item: "Mask", cost: { candles: 30 }, emoji: maskEmoji })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 6, { item: `${action} 2`, cost: { hearts: 10 }, emoji: actionEmoji })
			.set(1 << 7, { item: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 8, { item: "Blessing 3", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 9, { item: "Hair", cost: { candles: 42 }, emoji: hairEmoji })
			.set(1 << 10, { item: "Orb", cost: { candles: 20 }, emoji: placeablePropEmoji })
			.set(1 << 11, { item: "Cape", cost: { candles: 70 }, emoji: capeEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(47, skyDate(2_021, 10, 28))
			.set(98, skyDate(2_023, 10, 12)),
	},
});
