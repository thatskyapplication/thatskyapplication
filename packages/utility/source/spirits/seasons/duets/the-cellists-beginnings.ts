import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.TheCellistsBeginnings,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Hair",
				cosmetic: Cosmetic.TheCellistsBeginningsHair,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.TheCellistsBeginningsBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TheCellistsBeginningsBlessing2,
				cost: { seasonalCandles: 26 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.TheCellistsBeginningsProp,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TheCellistsBeginningsOutfit,
				cost: { seasonalCandles: 32 },
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.TheCellistsBeginningsBlessing4 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TheCellistsBeginningsSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
