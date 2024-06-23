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

const emote = SpiritEmote.FloatSpin;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit56;
const maskEmoji = MASK_EMOJIS.Mask88;
const hairEmoji = HAIR_EMOJIS.Hair139;
const capeEmoji = CAPE_EMOJIS.Cape124;

export default new SeasonalSpirit({
	name: SpiritName.Princess,
	season: SeasonName.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Mask", bit: 1 << 2, cost: { seasonalCandles: 8 }, emoji: maskEmoji },
			{ name: "Blessing 1", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 4, cost: { seasonalCandles: 18 }, emoji: blessing3 },
			{ name: "Hair", bit: 1 << 5, emoji: hairEmoji },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 22 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Outfit", bit: 1 << 8, cost: { seasonalCandles: 26 }, emoji: outfitEmoji },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing3 },
			{ name: "Blessing 4", bit: 1 << 10, cost: { seasonalCandles: 32 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 11, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 12,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NineColouredDeerHeart,
			},
		],
	},
});
