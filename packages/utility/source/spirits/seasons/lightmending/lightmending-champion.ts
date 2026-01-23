import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { FriendAction, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.LightmendingChampion,
	seasonId: SeasonId.Lightmending,
	action: FriendAction.RevolvingDance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.FriendActionRevolvingDance1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.LightmendingChampionBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.LightmendingChampionMask,
					cost: { seasonalCandles: 25 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.LightmendingChampionBlessing2,
					cost: { seasonalCandles: 6 },
				},
				{
					cosmetic: Cosmetic.FriendActionRevolvingDance2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.FriendActionRevolvingDance3,
					cost: { seasonalCandles: 28 },
					level: 3,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.LightmendingChampionBlessing3,
					cost: { seasonalCandles: 9 },
				},
				{
					cosmetic: Cosmetic.LightmendingChampionHeadAccessory,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.LightmendingChampionWhiteDye,
					cost: { seasonalCandles: 15 },
				},
				{
					cosmetic: Cosmetic.LightmendingChampionTrust,
				},
				{
					cosmetic: Cosmetic.FriendActionRevolvingDance4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.LightmendingChampionOutfit,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.LightmendingChampionSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
