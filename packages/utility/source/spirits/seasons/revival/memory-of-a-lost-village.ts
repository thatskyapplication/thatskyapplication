import { Cosmetic } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.MemoryOfALostVillage,
	seasonId: SeasonId.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.MemoryOfALostVillageBlessing1,
				cost: { seasonalCandles: 20 },
			},
			{ cosmetic: Cosmetic.MemoryOfALostVillageCape },
			{
				cosmetic: Cosmetic.MemoryOfALostVillageOutfit,
				cost: { seasonalCandles: 32 },
			},
			{ cosmetic: Cosmetic.MemoryOfALostVillageBlessing2 },
			{
				cosmetic: Cosmetic.MemoryOfALostVillageBlessing3,
				cost: { seasonalCandles: 38 },
			},
			{ cosmetic: Cosmetic.MemoryOfALostVillageHair },
			{
				cosmetic: Cosmetic.MemoryOfALostVillageSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
