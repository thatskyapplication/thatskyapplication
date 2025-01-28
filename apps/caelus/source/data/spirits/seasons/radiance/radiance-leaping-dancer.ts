import { Cosmetic, SeasonId, SpiritEmote, SpiritName } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const { DyeRed, DyeYellow } = MISCELLANEOUS_EMOJIS;
const emote = SpiritEmote.Cartwheel;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const outfitEmoji = OUTFIT_EMOJIS.Outfit75;
const shoeEmoji = SHOE_EMOJIS.Shoe17;
const hairEmoji = HAIR_EMOJIS.Hair155;
const capeEmoji = CAPE_EMOJIS.Cape142;
const largePlaceablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp79;

export default new SeasonalSpirit({
	name: SpiritName.RadianceLeapingDancer,
	seasonId: SeasonId.Radiance,
	emote,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.Cartwheel1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.Cartwheel2, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.RadianceLeapingDancerHair,
				cost: { seasonalCandles: 12 },
				emoji: hairEmoji,
			},
			{ name: "Red dye 1", cosmetic: Cosmetic.RadianceLeapingDancerRedDye1, emoji: DyeRed },
			{
				name: "Red dye 2",
				cosmetic: Cosmetic.RadianceLeapingDancerRedDye2,
				cost: { seasonalCandles: 16 },
				emoji: DyeRed,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.RadianceLeapingDancerProp,
				emoji: largePlaceablePropEmoji,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.Cartwheel3,
				cost: { seasonalCandles: 20 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.Cartwheel4, emoji: emoteEmoji },
			{
				name: "Red dye 3",
				cosmetic: Cosmetic.RadianceLeapingDancerRedDye3,
				cost: { seasonalCandles: 24 },
				emoji: DyeRed,
			},
			{ name: "Outfit", cosmetic: Cosmetic.RadianceLeapingDancerOutfit, emoji: outfitEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.RadianceLeapingDancerCape,
				cost: { seasonalCandles: 28 },
				emoji: capeEmoji,
			},
			{
				name: "Yellow dye 1",
				cosmetic: Cosmetic.RadianceLeapingDancerYellowDye1,
				emoji: DyeYellow,
			},
			{
				name: "Yellow dye 2",
				cosmetic: Cosmetic.RadianceLeapingDancerYellowDye2,
				cost: { seasonalCandles: 32 },
				emoji: DyeYellow,
			},
			{ name: "Shoes", cosmetic: Cosmetic.RadianceLeapingDancerShoes, emoji: shoeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RadianceLeapingDancerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RadianceHeart,
			},
		],
	},
});
