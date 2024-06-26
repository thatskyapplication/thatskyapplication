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
	FACE_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const action = FriendAction.HairTousle;
const actionEmoji = FriendActionToEmoji[action];
const blessing1 = MISCELLANEOUS_EMOJIS.Blessing1;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory08;
const heldProp = HELD_PROPS_EMOJIS.HeldProp14;

export default new SeasonalSpirit({
	name: SpiritName.HairtousleTeen,
	season: SeasonName.Belonging,
	action,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { seasonalCandles: 12 }, emoji: blessing1 },
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 2, cost: { seasonalCandles: 14 }, emoji: musicSheet },
			{ name: `${action} 2`, bit: 1 << 6, emoji: actionEmoji },
			{ name: "Blessing 3", bit: 1 << 9, cost: { seasonalCandles: 16 }, emoji: blessing2 },
			{ name: "Earmuffs", bit: 1 << 8, emoji: faceAccessoryEmoji },
			{ name: "Ukelele", bit: 1 << 7, cost: { seasonalCandles: 18 }, emoji: heldProp },
			{ name: "Blessing 4", bit: 1 << 10, emoji: blessing2 },
			{
				name: "Seasonal heart",
				bit: 1 << 3,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.BelongingHeart,
			},
		],
		current: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 2, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Heart", bit: 1 << 3, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 4,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing2 },
			{ name: `${action} 2`, bit: 1 << 6, cost: { hearts: 9 }, emoji: actionEmoji },
			{ name: "Ukelele", bit: 1 << 7, cost: { candles: 70 }, emoji: heldProp },
			{ name: "Earmuffs", bit: 1 << 8, cost: { candles: 50 }, emoji: faceAccessoryEmoji },
		],
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(11, skyDate(2_020, 6, 11))
			.set(63, skyDate(2_022, 6, 9))
			.set(110, skyDate(2_024, 3, 28)),
	},
});
