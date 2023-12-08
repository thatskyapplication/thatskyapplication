/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { SEASON_EMOJIS, FRIEND_ACTIONS_EMOJIS, OUTFIT_EMOJIS, MASK_EMOJIS } from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, FriendAction, SeasonalSpirit, SpiritName } from "../../Base.js";

const action = FriendAction.Handshake;
const actionEmoji = FRIEND_ACTIONS_EMOJIS.Handshake;
const outfitEmoji = OUTFIT_EMOJIS.Outfit31;
const maskEmoji = MASK_EMOJIS.Mask61;

export default new SeasonalSpirit({
	name: SpiritName.FranticStagehand,
	season: SeasonName.Performance,
	action,
	realm: Realm.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 10 } })
			.set(1 << 2, { item: "Hood", cost: null })
			.set(1 << 3, { item: "Music sheet", cost: { seasonalCandles: 22 } })
			.set(1 << 4, { item: "Blessing 2", cost: null })
			.set(1 << 5, { item: "Blessing 3", cost: { seasonalCandles: 26 } })
			.set(1 << 6, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 7, { item: "Mask", cost: { seasonalCandles: 30 }, emoji: maskEmoji })
			.set(1 << 8, { item: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 9, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PerformanceHeart }),
	},
});
