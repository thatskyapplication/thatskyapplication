import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.SenseOfSelf,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.SenseOfSelfMusicSheet,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SenseOfSelfBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SenseOfSelfBlessing2,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.SenseOfSelfShoes,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.SenseOfSelfNeckAccessory,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.SenseOfSelfBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.SenseOfSelfBlessing4,
					cost: { seasonalCandles: 28 },
				},
				{
					cosmetic: Cosmetic.SenseOfSelfHairAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.SenseOfSelfSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
