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
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Aww;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit32;
const maskEmoji = MASK_EMOJIS.Mask63;
const hairEmoji = HAIR_EMOJIS.Hair106;
const capeEmoji = CAPE_EMOJIS.Cape79;

export default new SeasonalSpirit({
	name: SpiritName.ForgetfulStoryteller,
	season: SeasonName.Performance,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 12 }, emoji: blessing3 })
			.set(1 << 3, { name: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 4, { name: "Hair", cost: { seasonalCandles: 16 }, emoji: hairEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 20 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { name: "Blessing 3", cost: { seasonalCandles: 26 }, emoji: blessing3 })
			.set(1 << 9, { name: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 10, { name: "Cape", cost: { seasonalCandles: 34 }, emoji: capeEmoji })
			.set(1 << 11, { name: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 12, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PerformanceHeart }),
	},
});
