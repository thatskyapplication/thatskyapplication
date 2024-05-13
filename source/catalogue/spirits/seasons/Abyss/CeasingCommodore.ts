import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.CalmDown;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const maskEmoji = MASK_EMOJIS.Mask53;
const hairEmoji = HAIR_EMOJIS.Hair99;
const capeEmoji = CAPE_EMOJIS.Cape69;

export default new SeasonalSpirit({
	name: SpiritName.CeasingCommodore,
	season: SeasonName.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: { hearts: 4 }, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { candles: 5 }, emoji: blessing3 })
			.set(1 << 3, { name: "Hair", cost: { candles: 45 }, emoji: hairEmoji })
			.set(1 << 10, { name: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 11, { name: "Wing buff", cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff })
			.set(1 << 6, { name: `${emote} 3`, cost: { hearts: 3 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: { hearts: 6 }, emoji: emoteEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: { candles: 5 }, emoji: blessing2 })
			.set(1 << 4, { name: "Mask", cost: { candles: 40 }, emoji: maskEmoji })
			.set(1 << 8, { name: "Cape", cost: { candles: 20 }, emoji: capeEmoji }),
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 6 }, emoji: blessing3 })
			.set(1 << 3, { name: "Hair", cost: null, emoji: hairEmoji })
			.set(1 << 4, { name: "Mask", cost: { seasonalCandles: 8 }, emoji: maskEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: null, emoji: blessing2 })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 16 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { name: "Cape", cost: { seasonalCandles: 20 }, emoji: capeEmoji })
			.set(1 << 9, { name: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AbyssHeart }),
	},
	visits: {
		returning: [5],
	},
});
