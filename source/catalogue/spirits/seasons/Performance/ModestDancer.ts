import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
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
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { seasonalCandles: 8 }, emoji: blessing3 })
			.set(1 << 2, { name: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 3, { name: "Mask", cost: { seasonalCandles: 14 }, emoji: maskEmoji })
			.set(1 << 4, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 5, { name: "Blessing 3", cost: { seasonalCandles: 26 }, emoji: blessing3 })
			.set(1 << 6, { name: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 7, { name: "Outfit", cost: { seasonalCandles: 30 }, emoji: outfitEmoji })
			.set(1 << 8, { name: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 9, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PerformanceHeart }),
	},
});
