import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.LightmendingLightCatcher,
	seasonId: SeasonId.Lightmending,
	action: FriendAction.Whisper,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.FriendActionSecretHandshake1,
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.LightmendingLightCatcherMask,
					cost: { seasonalCandles: 19 },
				},
			],
			[
				{
					translation: CosmeticCommon.Blessing,
					cosmetic: Cosmetic.LightmendingLightCatcherBlessing,
					cost: { seasonalCandles: 6 },
				},
				null,
				{
					cosmetic: Cosmetic.FriendActionSecretHandshake2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.FriendActionSecretHandshake3,
					cost: { seasonalCandles: 28 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.LightmendingLightCatcherCyanDye,
					cost: { seasonalCandles: 11 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.LightmendingLightCatcherHairAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.LightmendingLightCatcherCape,
					cost: { seasonalCandles: 38 },
				},
				{
					cosmetic: Cosmetic.LightmendingLightCatcherTrust,
				},
				{
					cosmetic: Cosmetic.FriendActionSecretHandshake4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					cosmetic: Cosmetic.LightmendingLightCatcherTransverseFlute,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.LightmendingLightCatcherSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
