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
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.RaiseTheRoof;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit35;
const maskEmoji = MASK_EMOJIS.Mask69;
const hairEmoji = HAIR_EMOJIS.Hair114;
const capeEmoji = CAPE_EMOJIS.Cape91;

export default new SeasonalSpirit({
	name: SpiritName.MindfulMiner,
	season: SeasonName.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 10 }, emoji: blessing3 },
			{ name: "Mask", bit: 1 << 3, emoji: maskEmoji },
			{ name: `${emote} 3`, bit: 1 << 4, cost: { seasonalCandles: 18 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 6, cost: { seasonalCandles: 24 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 7, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 8, cost: { seasonalCandles: 28 }, emoji: blessing3 },
			{ name: "Outfit", bit: 1 << 9, emoji: outfitEmoji },
			{ name: "Cape", bit: 1 << 10, cost: { seasonalCandles: 32 }, emoji: capeEmoji },
			{ name: "Blessing 4", bit: 1 << 11, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 12,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AuroraHeart,
			},
		],
	},
});
