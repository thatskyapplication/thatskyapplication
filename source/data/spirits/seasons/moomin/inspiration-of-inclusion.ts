import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit71;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace45;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory50;
const largePlaceablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp75;
const smallPlaceablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp82;

export default new SeasonalSpirit({
	name: SpiritName.InspirationOfInclusion,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Prop 1",
				cosmetic: Cosmetic.InspirationOfInclusionProp1,
				cost: { seasonalCandles: 12 },
				emoji: largePlaceablePropEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.InspirationOfInclusionBlessing1,
				emoji: blessing3,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.InspirationOfInclusionBlessing2,
				cost: { seasonalCandles: 16 },
				emoji: blessing3,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.InspirationOfInclusionHairAccessory,
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Prop 2",
				cosmetic: Cosmetic.InspirationOfInclusionProp2,
				cost: { seasonalCandles: 20 },
				emoji: smallPlaceablePropEmoji,
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.InspirationOfInclusionBlessing3,
				emoji: blessing3,
			},
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.InspirationOfInclusionBlessing4,
				cost: { seasonalCandles: 26 },
				emoji: blessing3,
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.InspirationOfInclusionNeckAccessory,
				emoji: necklaceEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.InspirationOfInclusionOutfit,
				cost: { seasonalCandles: 36 },
				emoji: outfitEmoji,
			},
			{
				name: "Blessing 5",
				cosmetic: Cosmetic.InspirationOfInclusionBlessing5,
				emoji: blessing3,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.InspirationOfInclusionSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.MoominHeart,
			},
		],
	},
});
