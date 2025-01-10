import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Pleading;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit40;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace26;
const hairEmoji = HAIR_EMOJIS.Hair119;

export default new SeasonalSpirit({
	name: SpiritName.PleadingChild,
	seasonId: SeasonId.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmotePleading1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmotePleading2, emoji: emoteEmoji },
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.PleadingChildNeckAccessory,
				cost: { seasonalCandles: 16 },
				emoji: necklaceEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.PleadingChildBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.PleadingChildBlessing2,
				cost: { seasonalCandles: 20 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.PleadingChildHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmotePleading3,
				cost: { seasonalCandles: 26 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmotePleading4, emoji: emoteEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.PleadingChildOutfit,
				cost: { seasonalCandles: 36 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.PleadingChildBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.PleadingChildSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RemembranceHeart,
			},
		],
	},
	visits: {
		returning: [7],
	},
});
