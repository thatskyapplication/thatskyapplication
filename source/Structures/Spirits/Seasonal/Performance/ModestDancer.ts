/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { FriendAction, FriendActionToEmoji, SpiritName } from "../../../../Utility/spirits.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit } from "../../Base.js";

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
	realm: Realm.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 8 }, emoji: blessing3 })
			.set(1 << 2, { item: "Music sheet", cost: null, emoji: musicSheet })
			.set(1 << 3, { item: "Mask", cost: { seasonalCandles: 14 }, emoji: maskEmoji })
			.set(1 << 4, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 5, { item: "Blessing 3", cost: { seasonalCandles: 26 }, emoji: blessing3 })
			.set(1 << 6, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 7, { item: "Outfit", cost: { seasonalCandles: 30 }, emoji: outfitEmoji })
			.set(1 << 8, { item: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 9, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PerformanceHeart }),
	},
});
