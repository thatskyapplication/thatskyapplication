import { Cosmetic } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.SpiritOfAdventure,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				cosmetic: Cosmetic.SpiritOfAdventureMusicSheet,
				cost: { seasonalCandles: 8 },
			},
			{
				cosmetic: Cosmetic.SpiritOfAdventureHair,
			},
			{
				cosmetic: Cosmetic.SpiritOfAdventureHarmonica,
				cost: { seasonalCandles: 20 },
			},
			{
				cosmetic: Cosmetic.SpiritOfAdventureBlessing1,
			},
			{
				cosmetic: Cosmetic.SpiritOfAdventureBlessing2,
				cost: { seasonalCandles: 26 },
			},
			{
				cosmetic: Cosmetic.SpiritOfAdventureProp,
			},
			{
				cosmetic: Cosmetic.SpiritOfAdventureCape,
				cost: { seasonalCandles: 38 },
			},
			{
				cosmetic: Cosmetic.SpiritOfAdventureBlessing3,
			},
			{
				cosmetic: Cosmetic.SpiritOfAdventureSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
