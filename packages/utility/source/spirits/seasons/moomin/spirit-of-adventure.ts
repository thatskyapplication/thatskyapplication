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
				name: "Music sheet",
				cosmetic: Cosmetic.SpiritOfAdventureMusicSheet,
				cost: { seasonalCandles: 8 },
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SpiritOfAdventureHair,
			},
			{
				name: "Harmonica",
				cosmetic: Cosmetic.SpiritOfAdventureHarmonica,
				cost: { seasonalCandles: 20 },
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SpiritOfAdventureBlessing1,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SpiritOfAdventureBlessing2,
				cost: { seasonalCandles: 26 },
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.SpiritOfAdventureProp,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.SpiritOfAdventureCape,
				cost: { seasonalCandles: 38 },
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.SpiritOfAdventureBlessing3,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SpiritOfAdventureSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
