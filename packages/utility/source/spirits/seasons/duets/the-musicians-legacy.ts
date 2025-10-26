import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.TheMusiciansLegacy,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.TheMusiciansLegacyMusicSheet,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.TheMusiciansLegacyBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.TheMusiciansLegacyBlessing2,
					cost: { seasonalCandles: 24 },
				},
				{
					cosmetic: Cosmetic.TheMusiciansLegacyProp1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.TheMusiciansLegacyProp2,
					cost: { seasonalCandles: 34 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.TheMusiciansLegacyBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.TheMusiciansLegacySeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
