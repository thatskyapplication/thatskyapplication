import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
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

const emote = SpiritEmote.RaiseTheRoof;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit35;
const maskEmoji = MASK_EMOJIS.Mask69;
const hairEmoji = HAIR_EMOJIS.Hair114;
const capeEmoji = CAPE_EMOJIS.Cape94;

export default new SeasonalSpirit({
	name: SpiritName.MindfulMiner,
	season: SeasonName.Aurora,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: `${emote} 1`, cost: null, emoji: emoteEmoji })
			.set(1 << 1, { name: `${emote} 2`, cost: null, emoji: emoteEmoji })
			.set(1 << 2, { name: "Blessing 1", cost: { seasonalCandles: 10 }, emoji: blessing3 })
			.set(1 << 3, { name: "Mask", cost: null, emoji: maskEmoji })
			.set(1 << 4, { name: `${emote} 3`, cost: { seasonalCandles: 18 }, emoji: emoteEmoji })
			.set(1 << 5, { name: `${emote} 4`, cost: null, emoji: emoteEmoji })
			.set(1 << 6, { name: "Hair", cost: { seasonalCandles: 24 }, emoji: hairEmoji })
			.set(1 << 7, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 8, { name: "Blessing 3", cost: { seasonalCandles: 28 }, emoji: blessing3 })
			.set(1 << 9, { name: "Outfit", cost: null, emoji: outfitEmoji })
			.set(1 << 10, { name: "Cape", cost: { seasonalCandles: 32 }, emoji: capeEmoji })
			.set(1 << 11, { name: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 12, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AuroraHeart }),
	},
});
