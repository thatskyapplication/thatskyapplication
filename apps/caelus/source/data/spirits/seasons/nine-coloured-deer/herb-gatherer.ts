import { RealmName } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Whistle;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit54;
const hairEmoji = HAIR_EMOJIS.Hair137;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp34;

export default new SeasonalSpirit({
	name: SpiritName.HerbGatherer,
	seasonId: SeasonId.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteWhistle1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteWhistle2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.HerbGathererBlessing1,
				cost: { seasonalCandles: 16 },
				emoji: blessing3,
			},
			{ name: "Outfit", cosmetic: Cosmetic.HerbGathererOutfit, emoji: outfitEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.HerbGathererHair,
				cost: { seasonalCandles: 26 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.HerbGathererBlessing2, emoji: blessing3 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteWhistle3,
				cost: { seasonalCandles: 30 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteWhistle4, emoji: emoteEmoji },
			{
				name: "Prop",
				cosmetic: Cosmetic.HerbGathererProp,
				cost: { seasonalCandles: 36 },
				emoji: placeablePropEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.HerbGathererBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.HerbGathererSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NineColouredDeerHeart,
			},
		],
	},
});
