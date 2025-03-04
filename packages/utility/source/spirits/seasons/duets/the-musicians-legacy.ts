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
				name: "Music sheet",
				cosmetic: Cosmetic.TheMusiciansLegacyMusicSheet,
				cost: { seasonalCandles: 14 },
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.TheMusiciansLegacyBlessing1 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TheMusiciansLegacyBlessing2,
				cost: { seasonalCandles: 24 },
			},
			{
				name: "Prop 1",
				cosmetic: Cosmetic.TheMusiciansLegacyProp1,
			},
			{
				name: "Prop 2",
				cosmetic: Cosmetic.TheMusiciansLegacyProp2,
				cost: { seasonalCandles: 34 },
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.TheMusiciansLegacyBlessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TheMusiciansLegacySeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
