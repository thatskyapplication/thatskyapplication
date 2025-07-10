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
				cosmetic: Cosmetic.TheCellistsBeginningsHair,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.TheCellistsBeginningsBlessing1 },
			{
				cosmetic: Cosmetic.TheCellistsBeginningsBlessing2,
				cost: { seasonalCandles: 26 },
			},
			{
				cosmetic: Cosmetic.TheCellistsBeginningsProp,
			},
			{
				cosmetic: Cosmetic.TheCellistsBeginningsOutfit,
				cost: { seasonalCandles: 32 },
			},
			{ cosmetic: Cosmetic.TheCellistsBeginningsBlessing4 },
			{
				cosmetic: Cosmetic.TheCellistsBeginningsSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
