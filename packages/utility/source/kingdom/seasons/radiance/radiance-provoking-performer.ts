import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

const emote = SpiritEmote.HypeDance;

export default new SeasonalSpirit({
	id: SpiritId.RadianceProvokingPerformer,
	seasonId: SeasonId.Radiance,
	area: AreaName.AviaryVillage,
	emote,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.HypeDance1 },
				{ cosmetic: Cosmetic.HypeDance2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.GreenDyeMultiple, number: 1 },
					cosmetic: Cosmetic.RadianceProvokingPerformerGreenDye1,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.HeadAccessory,
					cosmetic: Cosmetic.RadianceProvokingPerformerHeadAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.GreenDyeMultiple, number: 2 },
					cosmetic: Cosmetic.RadianceProvokingPerformerGreenDye2,
					cost: { seasonalCandles: 14 },
				},
				{
					cosmetic: Cosmetic.RadianceProvokingPerformerCymbals,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.HypeDance3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.HypeDance4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.RadianceProvokingPerformerOutfit,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.YellowDyeMultiple, number: 1 },
					cosmetic: Cosmetic.RadianceProvokingPerformerYellowDye1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.YellowDyeMultiple, number: 2 },
					cosmetic: Cosmetic.RadianceProvokingPerformerYellowDye2,
					cost: { seasonalCandles: 32 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.RadianceProvokingPerformerCape,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.RadianceProvokingPerformerShoes,
					cost: { seasonalCandles: 38 },
				},
				{
					translation: CosmeticCommon.WhiteDye,
					cosmetic: Cosmetic.RadianceProvokingPerformerWhiteDye,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.RadianceProvokingPerformerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
