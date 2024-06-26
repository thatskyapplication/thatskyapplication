import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const action = FriendAction.Handshake;
const actionEmoji = FriendActionToEmoji[action];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit31;
const maskEmoji = MASK_EMOJIS.Mask61;
const hairEmoji = HAIR_EMOJIS.Hair105;

export default new SeasonalSpirit({
	name: SpiritName.FranticStagehand,
	season: SeasonName.Performance,
	action,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		current: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Music sheet", bit: 1 << 3, cost: { candles: 22 }, emoji: musicSheet },
			{ name: "Blessing 1", bit: 1 << 1, cost: { candles: 5 }, emoji: blessing3 },
			{ name: "Hood", bit: 1 << 2, cost: { candles: 48 }, emoji: hairEmoji },
			{ name: "Heart", bit: 1 << 9, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 10,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: "Blessing 2", bit: 1 << 4, emoji: blessing3 },
			{ name: `${action} 2`, bit: 1 << 6, cost: { hearts: 8 }, emoji: actionEmoji },
			{ name: "Outfit", bit: 1 << 8, cost: { candles: 70 }, emoji: outfitEmoji },
			{ name: "Mask", bit: 1 << 7, cost: { candles: 34 }, emoji: maskEmoji },
		],
		seasonal: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { seasonalCandles: 10 }, emoji: blessing3 },
			{ name: "Hood", bit: 1 << 2, emoji: hairEmoji },
			{ name: "Music sheet", bit: 1 << 3, cost: { seasonalCandles: 22 }, emoji: musicSheet },
			{ name: "Blessing 2", bit: 1 << 4, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 5, cost: { seasonalCandles: 26 }, emoji: blessing3 },
			{ name: `${action} 2`, bit: 1 << 6, emoji: actionEmoji },
			{ name: "Mask", bit: 1 << 7, cost: { seasonalCandles: 30 }, emoji: maskEmoji },
			{ name: "Outfit", bit: 1 << 8, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 9,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PerformanceHeart,
			},
		],
	},
	visits: {
		returning: [5],
	},
});
