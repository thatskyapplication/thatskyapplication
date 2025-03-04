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
				name: "Blessing 1",
				cosmetic: Cosmetic.MemoryOfALostVillageBlessing1,
				cost: { seasonalCandles: 20 },
			},
			{ name: "Cape", cosmetic: Cosmetic.MemoryOfALostVillageCape },
			{
				name: "Outfit",
				cosmetic: Cosmetic.MemoryOfALostVillageOutfit,
				cost: { seasonalCandles: 32 },
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.MemoryOfALostVillageBlessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.MemoryOfALostVillageBlessing3,
				cost: { seasonalCandles: 38 },
			},
			{ name: "Hair", cosmetic: Cosmetic.MemoryOfALostVillageHair },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.MemoryOfALostVillageSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
