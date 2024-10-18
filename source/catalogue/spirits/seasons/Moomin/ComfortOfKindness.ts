import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace43;
const hairEmoji = HAIR_EMOJIS.Hair150;
const capeEmoji = CAPE_EMOJIS.Cape136;
const largePlaceablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp73;
const smallPlaceablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp81;

export default new SeasonalSpirit({
	name: SpiritName.ComfortOfKindness,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ComfortOfKindnessBlessing1,
				cost: { seasonalCandles: 6 },
				emoji: blessing3,
			},
			{
				name: "Prop 1",
				cosmetic: Cosmetic.ComfortOfKindnessProp1,
				emoji: smallPlaceablePropEmoji,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ComfortOfKindnessHair,
				cost: { seasonalCandles: 16 },
				emoji: hairEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ComfortOfKindnessBlessing2,
				emoji: blessing3,
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ComfortOfKindnessBlessing3,
				cost: { seasonalCandles: 20 },
				emoji: blessing3,
			},
			{
				name: "Prop 2",
				cosmetic: Cosmetic.ComfortOfKindnessProp2,
				emoji: largePlaceablePropEmoji,
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.ComfortOfKindnessNeckAccessory,
				cost: { seasonalCandles: 24 },
				emoji: necklaceEmoji,
			},
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.ComfortOfKindnessBlessing4,
				emoji: blessing3,
			},
			{
				name: "Blessing 5",
				cosmetic: Cosmetic.ComfortOfKindnessBlessing5,
				cost: { seasonalCandles: 32 },
				emoji: blessing3,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ComfortOfKindnessCape,
				emoji: capeEmoji,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ComfortOfKindnessSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.MoominHeart,
			},
		],
	},
});
