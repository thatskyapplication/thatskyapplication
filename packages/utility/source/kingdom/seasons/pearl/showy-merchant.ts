import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.ShowyMerchant,
	seasonId: SeasonId.Pearl,
	area: AreaName.PearlVillage,
	friendshipTrees: {
		seasonal: {
			friendshipTree: [
				[
					{
						cosmetic: Cosmetic.EmoteShowOff1,
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
						cosmetic: Cosmetic.ShowyMerchantBlessing1,
						cost: { seasonalCandles: 4 },
					},
				],
				[
					{
						translation: CosmeticCommon.Hair,
						cosmetic: Cosmetic.ShowyMerchantHair,
						cost: { seasonalCandles: 18 },
					},
					{
						translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
						cosmetic: Cosmetic.ShowyMerchantBlessing2,
						cost: { seasonalCandles: 7 },
					},
					{
						cosmetic: Cosmetic.EmoteShowOff2,
						level: 2,
						seasonPass: true,
					},
				],
				[
					{
						cosmetic: Cosmetic.EmoteShowOff3,
						cost: { seasonalCandles: 28 },
						level: 3,
					},
					{
						translation: CosmeticCommon.CyanDye,
						cosmetic: Cosmetic.ShowyMerchantCyanDye,
						cost: { seasonalCandles: 8 },
					},
					{
						translation: CosmeticCommon.Cape,
						cosmetic: Cosmetic.ShowyMerchantCape,
						seasonPass: true,
					},
				],
				[
					{
						translation: CosmeticCommon.Outfit,
						cosmetic: Cosmetic.ShowyMerchantOutfit,
						cost: { seasonalCandles: 32 },
					},
					{ translation: CosmeticCommon.Trust, cosmetic: Cosmetic.ShowyMerchantTrust },
					{
						cosmetic: Cosmetic.EmoteShowOff4,
						level: 4,
						seasonPass: true,
					},
				],
				[
					null,
					null,
					{
						translation: CosmeticCommon.SeasonalHeart,
						cosmetic: Cosmetic.ShowyMerchantSeasonalHeart,
						cost: { seasonalCandles: 3 },
						seasonPass: true,
					},
				],
			],
		},
	},
});
