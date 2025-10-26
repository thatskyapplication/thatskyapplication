import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.RoyalHairtousleTeen,
	seasonId: SeasonId.BlueBird,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteAmazed1,
				},
				{ cosmetic: Cosmetic.EmoteAmazed2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.RoyalHairtousleTeenBlessing1,
					cost: { seasonalCandles: 12 },
				},
				{ cosmetic: Cosmetic.RoyalHairtousleTeenHeadAccessory, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.EmoteAmazed3,
					cost: { seasonalCandles: 17 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteAmazed4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.RoyalHairtousleTeenOutfit,
					cost: { seasonalCandles: 25 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.RoyalHairtousleTeenBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.RoyalHairtousleTeenWhiteDye,
					cost: { seasonalCandles: 29 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.RoyalHairtousleTeenCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.RoyalHairtousleTeenSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
