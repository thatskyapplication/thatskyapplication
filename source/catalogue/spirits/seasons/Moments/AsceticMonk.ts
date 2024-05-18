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
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.BlindfoldBalancePose;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit47;
const maskEmoji = MASK_EMOJIS.Mask82;
const hairEmoji = HAIR_EMOJIS.Hair128;

export default new SeasonalSpirit({
	name: SpiritName.AsceticMonk,
	season: SeasonName.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 6 }, emoji: blessing3 })
			.set(1 << 3, { name: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 4, { name: "Hair", cost: { seasonalCandles: 18 }, emoji: hairEmoji })
			.set(1 << 5, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 6, { name: `${emote} 3`, cost: { seasonalCandles: 26 }, emoji: emoteEmoji })
			.set(1 << 7, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 8, { name: "Outfit", cost: { seasonalCandles: 32 }, emoji: outfitEmoji })
			.set(1 << 9, { name: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 10, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.MomentsHeart }),
	},
});
