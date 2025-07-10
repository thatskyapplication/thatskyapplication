import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.ThePianistsBeginnings,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.ThePianistsBeginningsBlessing1,
				cost: { seasonalCandles: 14 },
			},
			{
				cosmetic: Cosmetic.ThePianistsBeginningsProp1,
			},
			{
				cosmetic: Cosmetic.ThePianistsBeginningsHair,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.ThePianistsBeginningsBlessing2 },
			{
				cosmetic: Cosmetic.ThePianistsBeginningsBlessing3,
				cost: { seasonalCandles: 24 },
			},
			{ cosmetic: Cosmetic.ThePianistsBeginningsOutfit },
			{
				cosmetic: Cosmetic.ThePianistsBeginningsProp2,
				cost: { seasonalCandles: 30 },
			},
			{ cosmetic: Cosmetic.ThePianistsBeginningsBlessing4 },
			{
				cosmetic: Cosmetic.ThePianistsBeginningsSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
