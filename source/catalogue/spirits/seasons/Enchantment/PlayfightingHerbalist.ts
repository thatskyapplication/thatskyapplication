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
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const action = FriendAction.PlayFight;
const actionEmoji = FriendActionToEmoji[action];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask28;
const hairEmoji = HAIR_EMOJIS.Hair58;
const capeEmoji = CAPE_EMOJIS.Cape28;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp20;

export default new SeasonalSpirit({
	name: SpiritName.PlayfightingHerbalist,
	season: SeasonName.Enchantment,
	action,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 1, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 2, cost: { seasonalCandles: 14 }, emoji: maskEmoji },
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing2 },
			{ name: "Blessing 3", bit: 1 << 8, cost: { seasonalCandles: 16 }, emoji: blessing2 },
			{ name: `${action} 2`, bit: 1 << 6, emoji: actionEmoji },
			{ name: "Music sheet", bit: 1 << 7, cost: { seasonalCandles: 18 }, emoji: musicSheet },
			{ name: "Hair", bit: 1 << 9, emoji: hairEmoji },
			{ name: "Cape", bit: 1 << 11, cost: { seasonalCandles: 20 }, emoji: capeEmoji },
			{ name: "Blessing 4", bit: 1 << 12, emoji: blessing2 },
			{
				name: "Seasonal heart",
				bit: 1 << 3,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.EnchantmentHeart,
			},
		],
		current: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 2, cost: { candles: 30 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 4,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing2 },
			{ name: `${action} 2`, bit: 1 << 6, cost: { hearts: 10 }, emoji: actionEmoji },
			{ name: "Music sheet", bit: 1 << 7, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Blessing 3", bit: 1 << 8, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 9, cost: { candles: 42 }, emoji: hairEmoji },
			{ name: "Orb", bit: 1 << 10, cost: { candles: 20 }, emoji: placeablePropEmoji },
			{ name: "Cape", bit: 1 << 11, cost: { candles: 70 }, emoji: capeEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(47, skyDate(2_021, 10, 28))
			.set(98, skyDate(2_023, 10, 12)),
	},
});
