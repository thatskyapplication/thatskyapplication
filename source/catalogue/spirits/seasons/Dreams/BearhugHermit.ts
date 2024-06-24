import { Collection } from "discord.js";
import type { DateTime } from "luxon";
import { type SeasonalSpiritVisitCollectionKey, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
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
		seasonal: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 13 }, emoji: blessing2 },
			{ name: "Red horns", bit: 1 << 3, emoji: faceAccessoryEmoji },
			{ name: "Blessing 2", bit: 1 << 6, cost: { seasonalCandles: 18 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 1, emoji: musicSheet },
			{ name: "Blessing 3", bit: 1 << 10, cost: { seasonalCandles: 23 }, emoji: blessing2 },
			{ name: `${action} 2`, bit: 1 << 7, emoji: actionEmoji },
			{ name: "Hair", bit: 1 << 8, cost: { seasonalCandles: 29 }, emoji: hairEmoji },
			{ name: "Outfit", bit: 1 << 9, emoji: outfitEmoji },
			{ name: "Seasonal heart", bit: 1 << 4, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.DreamsHeart },
		],
		current: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Music sheet", bit: 1 << 1, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Red horns", bit: 1 << 3, cost: { candles: 42 }, emoji: faceAccessoryEmoji },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 5, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: "Blessing 2", bit: 1 << 6, cost: { candles: 5 }, emoji: blessing2 },
			{ name: `${action} 2`, bit: 1 << 7, cost: { hearts: 8 }, emoji: actionEmoji },
			{ name: "Hair", bit: 1 << 8, cost: { candles: 50 }, emoji: hairEmoji },
			{ name: "Outfit", bit: 1 << 9, cost: { candles: 70 }, emoji: outfitEmoji },
		],
	},
	keywords: ["yeti"],
	visits: {
		travelling: new Collection<SeasonalSpiritVisitCollectionKey, DateTime>()
			.set(75, skyDate(2_022, 11, 24))
			.set(107, skyDate(2_024, 2, 15)),
	},
});
