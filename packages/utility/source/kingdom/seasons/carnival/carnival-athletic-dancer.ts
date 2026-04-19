import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

export default new SeasonalSpirit({
	id: SpiritId.CarnivalAthleticDancer,
	seasonId: SeasonId.Carnival,
	emote: SpiritEmote.Breakdance,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteBreakdance1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.CarnivalAthleticDancerBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.CarnivalAthleticDancerMask,
					cost: { seasonalCandles: 19 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.CarnivalAthleticDancerBlessing2,
					cost: { seasonalCandles: 7 },
				},
				{
					cosmetic: Cosmetic.EmoteBreakdance2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBreakdance3,
					level: 3,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.CarnivalAthleticDancerBlessing3,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.CarnivalAthleticDancerCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.CarnivalAthleticDancerOutfit,
					cost: { seasonalCandles: 28 },
				},
				{
					cosmetic: Cosmetic.CarnivalAthleticDancerTrust,
				},
				{
					cosmetic: Cosmetic.EmoteBreakdance4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.CarnivalAthleticDancerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
