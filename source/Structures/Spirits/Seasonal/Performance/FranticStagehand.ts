/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import {
	FRIEND_ACTION_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, FriendAction, SeasonalSpirit, SpiritName } from "../../Base.js";

const action = FriendAction.Handshake;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const actionEmoji = FRIEND_ACTION_EMOJIS.Handshake;
const outfitEmoji = OUTFIT_EMOJIS.Outfit31;
const maskEmoji = MASK_EMOJIS.Mask61;
const hairEmoji = HAIR_EMOJIS.Hair105;

export default new SeasonalSpirit({
	name: SpiritName.FranticStagehand,
	season: SeasonName.Performance,
	action,
	realm: Realm.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 3, { item: "Music sheet", cost: { candles: 22 }, emoji: musicSheet })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 5 }, emoji: blessing3 })
			.set(1 << 2, { item: "Hood", cost: { candles: 48 }, emoji: hairEmoji })
			.set(1 << 9, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 10, { item: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 4, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { item: `${action} 2`, cost: { hearts: 8 }, emoji: actionEmoji })
			.set(1 << 8, { item: "Outfit", cost: { candles: 70 }, emoji: outfitEmoji })
			.set(1 << 7, { item: "Mask", cost: { candles: 34 }, emoji: maskEmoji }),
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { item: "Blessing 1", cost: { seasonalCandles: 10 }, emoji: blessing3 })
			.set(1 << 2, { item: "Hood", cost: null, emoji: hairEmoji })
			.set(1 << 3, { item: "Music sheet", cost: { seasonalCandles: 22 }, emoji: musicSheet })
			.set(1 << 4, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 5, { item: "Blessing 3", cost: { seasonalCandles: 26 }, emoji: blessing3 })
			.set(1 << 6, { item: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 7, { item: "Mask", cost: { seasonalCandles: 30 }, emoji: maskEmoji })
			.set(1 << 8, { item: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 9, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PerformanceHeart }),
	},
	visits: {
		returning: [5],
	},
});
