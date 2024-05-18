import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
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
		current: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 3, { name: "Music sheet", cost: { candles: 22 }, emoji: musicSheet })
			.set(1 << 1, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing3 })
			.set(1 << 2, { name: "Hood", cost: { candles: 48 }, emoji: hairEmoji })
			.set(1 << 9, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 10, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 4, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { name: `${action} 2`, cost: { hearts: 8 }, emoji: actionEmoji })
			.set(1 << 8, { name: "Outfit", cost: { candles: 70 }, emoji: outfitEmoji })
			.set(1 << 7, { name: "Mask", cost: { candles: 34 }, emoji: maskEmoji }),
		seasonal: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${action} 1`, cost: null, emoji: actionEmoji })
			.set(1 << 1, { name: "Blessing 1", cost: { seasonalCandles: 10 }, emoji: blessing3 })
			.set(1 << 2, { name: "Hood", cost: null, emoji: hairEmoji })
			.set(1 << 3, { name: "Music sheet", cost: { seasonalCandles: 22 }, emoji: musicSheet })
			.set(1 << 4, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 5, { name: "Blessing 3", cost: { seasonalCandles: 26 }, emoji: blessing3 })
			.set(1 << 6, { name: `${action} 2`, cost: null, emoji: actionEmoji })
			.set(1 << 7, { name: "Mask", cost: { seasonalCandles: 30 }, emoji: maskEmoji })
			.set(1 << 8, { name: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 9, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PerformanceHeart }),
	},
	visits: {
		returning: [5],
	},
});
