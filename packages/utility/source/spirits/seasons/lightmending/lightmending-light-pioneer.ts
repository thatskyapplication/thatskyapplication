import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.LightmendingPioneer,
	seasonId: SeasonId.Lightmending,
	emote: SpiritEmote.CuteClap,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteCuteClap1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.LightmendingPioneerBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.LightmendingPioneerBlessing2,
					cost: { seasonalCandles: 6 },
				},
				null,
				{
					cosmetic: Cosmetic.EmoteCuteClap2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteCuteClap3,
					cost: { seasonalCandles: 28 },
					level: 3,
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.LightmendingPioneerHair,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.LightmendingPioneerMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.LightmendingPioneerBlueDye,
					cost: { seasonalCandles: 15 },
				},
				{
					cosmetic: Cosmetic.LightmendingPioneerTrust,
				},
				{
					cosmetic: Cosmetic.EmoteCuteClap4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.LightmendingPioneerOutfit,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.LightmendingPioneerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
