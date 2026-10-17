import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.RadianceGreetingShaman,
	seasonId: SeasonId.Radiance,
	area: AreaName.AviaryVillage,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteHeartGesture1 },
				{ cosmetic: Cosmetic.EmoteHeartGesture2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.RadianceGreetingShamanHairAccessory,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlueDyeMultiple, number: 1 },
					cosmetic: Cosmetic.RadianceGreetingShamanBlueDye1,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlueDyeMultiple, number: 2 },
					cosmetic: Cosmetic.RadianceGreetingShamanBlueDye2,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.CyanDyeMultiple, number: 1 },
					cosmetic: Cosmetic.RadianceGreetingShamanCyanDye1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteHeartGesture3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteHeartGesture4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.PurpleDyeMultiple, number: 1 },
					cosmetic: Cosmetic.RadianceGreetingShamanPurpleDye1,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: CosmeticCommon.BlackDye,
					cosmetic: Cosmetic.RadianceGreetingShamanBlackDye,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.RadianceGreetingShamanHair,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: { key: CosmeticCommon.CyanDyeMultiple, number: 2 },
					cosmetic: Cosmetic.RadianceGreetingShamanCyanDye2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.PurpleDyeMultiple, number: 2 },
					cosmetic: Cosmetic.RadianceGreetingShamanPurpleDye2,
					cost: { seasonalCandles: 28 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.RadianceGreetingShamanOutfit,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.RadianceGreetingShamanSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
