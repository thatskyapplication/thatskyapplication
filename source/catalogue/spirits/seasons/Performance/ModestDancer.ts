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

const action = FriendAction.DuetDance;
const actionEmoji = FriendActionToEmoji[action];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const outfitEmoji = OUTFIT_EMOJIS.Outfit30;
const maskEmoji = MASK_EMOJIS.Mask60;
const hairEmoji = HAIR_EMOJIS.Hair104;

export default new SeasonalSpirit({
	name: SpiritName.ModestDancer,
	season: SeasonName.Performance,
	action,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${action} 1`, bit: 1 << 0, emoji: actionEmoji },
			{ name: "Blessing 1", bit: 1 << 1, cost: { seasonalCandles: 8 }, emoji: blessing3 },
			{ name: "Music sheet", bit: 1 << 2, emoji: musicSheet },
			{ name: "Mask", bit: 1 << 3, cost: { seasonalCandles: 14 }, emoji: maskEmoji },
			{ name: "Blessing 2", bit: 1 << 4, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 5, cost: { seasonalCandles: 26 }, emoji: blessing3 },
			{ name: `${action} 2`, bit: 1 << 6, emoji: actionEmoji },
			{ name: "Outfit", bit: 1 << 7, cost: { seasonalCandles: 30 }, emoji: outfitEmoji },
			{ name: "Hair", bit: 1 << 8, emoji: hairEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 9,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PerformanceHeart,
			},
		],
	},
});
