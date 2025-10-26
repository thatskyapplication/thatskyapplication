import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
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
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.SpiritOfAdventureMusicSheet,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SpiritOfAdventureHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.SpiritOfAdventureHarmonica,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SpiritOfAdventureBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SpiritOfAdventureBlessing2,
					cost: { seasonalCandles: 26 },
				},
				{
					cosmetic: Cosmetic.SpiritOfAdventureProp,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.SpiritOfAdventureCape,
					cost: { seasonalCandles: 38 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.SpiritOfAdventureBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.SpiritOfAdventureSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
