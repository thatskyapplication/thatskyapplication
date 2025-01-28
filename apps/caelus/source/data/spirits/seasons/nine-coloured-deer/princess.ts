import {
	Cosmetic,
	RealmName,
	SeasonId,
	SpiritEmote,
	SpiritName,
} from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.FloatSpin;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit56;
const maskEmoji = MASK_EMOJIS.Mask88;
const hairEmoji = HAIR_EMOJIS.Hair139;
const capeEmoji = CAPE_EMOJIS.Cape124;

export default new SeasonalSpirit({
	name: SpiritName.Princess,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFloatSpin1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteFloatSpin2, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.PrincessMask,
				cost: { seasonalCandles: 8 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.PrincessBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PrincessBlessing2,
				cost: { seasonalCandles: 18 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.PrincessHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFloatSpin3,
				cost: { seasonalCandles: 22 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteFloatSpin4, emoji: emoteEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.PrincessOutfit,
				cost: { seasonalCandles: 26 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.PrincessBlessing3, emoji: blessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.PrincessBlessing4,
				cost: { seasonalCandles: 32 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.PrincessCape, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.PrincessSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NineColouredDeerHeart,
			},
		],
	},
});
