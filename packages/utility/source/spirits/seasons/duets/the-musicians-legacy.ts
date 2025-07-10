import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.TheMusiciansLegacy,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.TheMusiciansLegacyMusicSheet,
				cost: { seasonalCandles: 14 },
			},
			{ cosmetic: Cosmetic.TheMusiciansLegacyBlessing1 },
			{
				cosmetic: Cosmetic.TheMusiciansLegacyBlessing2,
				cost: { seasonalCandles: 24 },
			},
			{
				cosmetic: Cosmetic.TheMusiciansLegacyProp1,
			},
			{
				cosmetic: Cosmetic.TheMusiciansLegacyProp2,
				cost: { seasonalCandles: 34 },
			},
			{ cosmetic: Cosmetic.TheMusiciansLegacyBlessing3 },
			{
				cosmetic: Cosmetic.TheMusiciansLegacySeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
