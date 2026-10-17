import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.WrestlingSailor,
	seasonId: SeasonId.Pearl,
	area: AreaName.PearlVillage,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteArmWrestle,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.WrestlingSailorBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.WrestlingSailorCape,
					cost: { seasonalCandles: 18 },
				},
				null,
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.WrestlingSailorBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.BlueDye,
					cosmetic: Cosmetic.WrestlingSailorBlueDye,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.WrestlingSailorBlessing3,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.WrestlingSailorOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.WrestlingSailorHair,
					cost: { seasonalCandles: 32 },
				},
				{ translation: CosmeticCommon.Trust, cosmetic: Cosmetic.WrestlingSailorTrust },
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 4 },
					cosmetic: Cosmetic.WrestlingSailorBlessing4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.WrestlingSailorSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
