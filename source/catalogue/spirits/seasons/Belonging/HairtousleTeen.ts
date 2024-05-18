import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
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
		seasonal: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { seasonalCandles: 12 }, emoji: blessing1 })
			.set(1 << 5, { name: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 2, { name: "Music sheet", cost: { seasonalCandles: 14 }, emoji: musicSheet })
			.set(1 << 6, { name: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 9, { name: "Blessing 3", cost: { seasonalCandles: 16 }, emoji: blessing2 })
			.set(1 << 8, { name: "Earmuffs", cost: null, emoji: faceAccessoryEmoji })
			.set(1 << 7, { name: "Ukelele", cost: { seasonalCandles: 18 }, emoji: heldProp })
			.set(1 << 10, { name: "Blessing 4", cost: null, emoji: blessing2 })
			.set(1 << 3, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.BelongingHeart }),
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 2, { name: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 3, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 5, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 6, { name: `${action} 2`, cost: { hearts: 9 }, emoji: actionEmoji })
			.set(1 << 7, { name: "Ukelele", cost: { candles: 70 }, emoji: heldProp })
			.set(1 << 8, { name: "Earmuffs", cost: { candles: 50 }, emoji: faceAccessoryEmoji }),
	},
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(11, skyDate(2_020, 6, 11))
			.set(63, skyDate(2_022, 6, 9))
			.set(110, skyDate(2_024, 3, 28)),
	},
});
