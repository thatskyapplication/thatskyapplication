import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.CuddlyRollingChild,
	seasonId: SeasonId.Pearl,
	area: AreaName.PearlVillage,
	emote: SpiritEmote.Wallow,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteWallow1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CuddlyRollingChildBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.CuddlyRollingChildMask,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CuddlyRollingChildBlessing2,
					cost: { seasonalCandles: 7 },
				},
				{
					cosmetic: Cosmetic.EmoteWallow2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteWallow3,
					cost: { seasonalCandles: 28 },
					level: 3,
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.CuddlyRollingChildOutfit,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.CuddlyRollingChildHair,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.BlueDye,
					cosmetic: Cosmetic.CuddlyRollingChildBlueDye,
					cost: { seasonalCandles: 12 },
				},
				{ translation: CosmeticCommon.Trust, cosmetic: Cosmetic.CuddlyRollingChildTrust },
				{
					cosmetic: Cosmetic.EmoteWallow4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.CuddlyRollingChildCape,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.CuddlyRollingChildSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
