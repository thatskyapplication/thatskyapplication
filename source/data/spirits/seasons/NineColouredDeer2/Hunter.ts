import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Flex;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit55;
const hairEmoji = HAIR_EMOJIS.Hair138;
const capeEmoji = CAPE_EMOJIS.Cape122;

export default new SeasonalSpirit({
	name: SpiritName.Hunter,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteFlex1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteFlex2, emoji: emoteEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.HunterOutfit,
				cost: { seasonalCandles: 8 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.HunterBlessing1, emoji: blessing3 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteFlex3,
				cost: { seasonalCandles: 20 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteFlex4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.HunterBlessing2,
				cost: { seasonalCandles: 28 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.HunterHair, emoji: hairEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.HunterCape,
				cost: { seasonalCandles: 34 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.HunterBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.HunterSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NineColouredDeerHeart,
			},
		],
	},
});
