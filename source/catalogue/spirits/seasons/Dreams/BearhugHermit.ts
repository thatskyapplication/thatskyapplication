/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const action = FriendAction.Bearhug;
const actionEmoji = FriendActionToEmoji[action];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit19;
const faceAccessoryEmoji = FACE_ACCESSORY_EMOJIS.FaceAccessory12;
const hairEmoji = HAIR_EMOJIS.Hair70;

export default new SeasonalSpirit({
	name: SpiritName.BearhugHermit,
	season: SeasonName.Dreams,
	action,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 13 }, emoji: blessing2 })
			.set(1 << 3, { name: "Red horns", cost: null, emoji: faceAccessoryEmoji })
			.set(1 << 6, { name: "Blessing 2", cost: { seasonalCandles: 18 }, emoji: blessing2 })
			.set(1 << 1, { name: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 10, { name: "Blessing 3", cost: { seasonalCandles: 23 }, emoji: blessing2 })
			.set(1 << 7, { name: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 8, { name: "Hair", cost: { seasonalCandles: 29 }, emoji: hairEmoji })
			.set(1 << 9, { name: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 4, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.DreamsHeart }),
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { name: "Music sheet", cost: { candles: 15 }, emoji: musicSheet })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 3, { name: "Red horns", cost: { candles: 42 }, emoji: faceAccessoryEmoji })
			.set(1 << 4, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 5, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 7, { name: `${action} 2`, cost: { hearts: 8 }, emoji: actionEmoji })
			.set(1 << 8, { name: "Hair", cost: { candles: 50 }, emoji: hairEmoji })
			.set(1 << 9, { name: "Outfit", cost: { candles: 70 }, emoji: outfitEmoji }),
	},
	keywords: ["yeti"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(75, skyDate(2_022, 11, 24))
			.set(107, skyDate(2_024, 2, 15)),
	},
});
