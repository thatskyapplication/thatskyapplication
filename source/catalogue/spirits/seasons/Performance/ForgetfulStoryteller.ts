import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
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
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 12 }, emoji: blessing3 },
			{ name: "Mask", bit: 1 << 3, emoji: maskEmoji },
			{ name: "Hair", bit: 1 << 4, cost: { seasonalCandles: 16 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing3 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 20 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Blessing 3", bit: 1 << 8, cost: { seasonalCandles: 26 }, emoji: blessing3 },
			{ name: "Outfit", bit: 1 << 9, emoji: outfitEmoji },
			{ name: "Cape", bit: 1 << 10, cost: { seasonalCandles: 34 }, emoji: capeEmoji },
			{ name: "Blessing 4", bit: 1 << 11, emoji: blessing3 },
			{ name: "Seasonal heart", bit: 1 << 12, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PerformanceHeart },
		],
	},
});
