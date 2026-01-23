import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.LightmendingLightScholar,
	seasonId: SeasonId.Lightmending,
	action: FriendAction.Whisper,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.FriendActionWhisper1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.LightmendingLightScholarBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.LightmendingLightScholarHair,
					cost: { seasonalCandles: 25 },
				},
				null,
				{
					cosmetic: Cosmetic.FriendActionWhisper2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.FriendActionWhisper3,
					cost: { seasonalCandles: 28 },
					level: 3,
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.LightmendingLightScholarCape,
					cost: { seasonalCandles: 30 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.LightmendingLightScholarMask,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.LightmendingLightScholarBlessing2,
					cost: { seasonalCandles: 12 },
				},
				{
					cosmetic: Cosmetic.LightmendingLightScholarTrust,
				},
				{
					cosmetic: Cosmetic.FriendActionWhisper4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.LightmendingLightScholarOutfit,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.LightmendingLightScholarSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
