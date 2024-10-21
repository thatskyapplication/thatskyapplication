import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants-2.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Grieving;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const maskEmoji = MASK_EMOJIS.Mask73;
const hairEmoji = HAIR_EMOJIS.Hair120;
const capeEmoji = CAPE_EMOJIS.Cape98;

export default new SeasonalSpirit({
	name: SpiritName.BereftVeteran,
	seasonId: SeasonId.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteGrieving1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteGrieving2, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.BereftVeteranMask,
				cost: { seasonalCandles: 6 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.BereftVeteranBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BereftVeteranBlessing2,
				cost: { seasonalCandles: 18 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.BereftVeteranHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteGrieving3,
				cost: { seasonalCandles: 30 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteGrieving4, emoji: emoteEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.BereftVeteranCape,
				cost: { seasonalCandles: 34 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.BereftVeteranBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BereftVeteranSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RemembranceHeart,
			},
		],
	},
});
