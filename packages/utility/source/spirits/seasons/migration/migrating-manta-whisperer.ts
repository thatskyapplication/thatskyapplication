import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.MigratingMantaWhisperer,
	seasonId: SeasonId.Migration,
	emote: SpiritEmote.FlagSignal,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteFlagSignal1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MigratingMantaWhispererBlessing1,
					cost: { seasonalCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.MigratingMantaWhispererHair,
					cost: { seasonalCandles: 23 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MigratingMantaWhispererBlessing2,
					cost: { seasonalCandles: 4 },
				},
				{
					cosmetic: Cosmetic.EmoteFlagSignal2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteFlagSignal3,
					cost: { seasonalCandles: 24 },
					level: 3,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MigratingMantaWhispererBlessing3,
					cost: { seasonalCandles: 6 },
				},
				{
					cosmetic: Cosmetic.MigratingMantaWhispererCape,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.MigratingMantaWhispererWhiteDye,
					cost: { seasonalCandles: 12 },
				},
				{
					cosmetic: Cosmetic.MigratingMantaWhispererTrust,
				},
				{
					cosmetic: Cosmetic.EmoteFlagSignal4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.MigratingMantaWhispererOutfit,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					cosmetic: Cosmetic.MigratingMantaWhispererSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
