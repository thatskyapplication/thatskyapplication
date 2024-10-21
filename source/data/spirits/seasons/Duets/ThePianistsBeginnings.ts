import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../Utility2/catalogue.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility2/emojis.js";
import { SpiritName } from "../../../../Utility2/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit61;
const hairEmoji = HAIR_EMOJIS.Hair147;
const { SmallPlaceableProp74, SmallPlaceableProp75 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.ThePianistsBeginnings,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ThePianistsBeginningsBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing3,
			},
			{
				name: "Prop 1",
				cosmetic: Cosmetic.ThePianistsBeginningsProp1,
				emoji: SmallPlaceableProp74,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.ThePianistsBeginningsHair,
				cost: { seasonalCandles: 20 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ThePianistsBeginningsBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ThePianistsBeginningsBlessing3,
				cost: { seasonalCandles: 24 },
				emoji: blessing3,
			},
			{ name: "Outfit", cosmetic: Cosmetic.ThePianistsBeginningsOutfit, emoji: outfitEmoji },
			{
				name: "Prop 2",
				cosmetic: Cosmetic.ThePianistsBeginningsProp2,
				cost: { seasonalCandles: 30 },
				emoji: SmallPlaceableProp75,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.ThePianistsBeginningsBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ThePianistsBeginningsSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
