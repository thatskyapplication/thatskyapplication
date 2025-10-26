import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.MigratingButterflyCharmer,
	seasonId: SeasonId.Migration,
	emote: SpiritEmote.Dizzy,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteDizzy1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MigratingButterflyCharmerBlessing1,
					cost: { seasonalCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.MigratingButterflyCharmerYellowDye,
					cost: { seasonalCandles: 6 },
				},
				null,
				{
					cosmetic: Cosmetic.EmoteDizzy2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteDizzy3,
					level: 3,
					cost: { seasonalCandles: 24 },
				},
				{
					cosmetic: Cosmetic.MigratingButterflyCharmerCape,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MigratingButterflyCharmerBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MigratingButterflyCharmerBlessing3,
					cost: { seasonalCandles: 8 },
				},
				{
					cosmetic: Cosmetic.MigratingButterflyCharmerTrust,
				},
				{
					cosmetic: Cosmetic.EmoteDizzy4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					cosmetic: Cosmetic.MigratingButterflyCharmerHairAccessory,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					cosmetic: Cosmetic.MigratingButterflyCharmerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
