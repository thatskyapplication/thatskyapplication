import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.HeartGesture;

export default new SeasonalSpirit({
	id: SpiritId.RadianceGreetingShaman,
	seasonId: SeasonId.Radiance,
	emote,
	offer: {
		hasInfographic: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.HeartGesture1 },
				{ cosmetic: Cosmetic.HeartGesture2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.RadianceGreetingShamanHairAccessory,
					cost: { seasonalCandles: 14 },
				},
				{
					cosmetic: Cosmetic.RadianceGreetingShamanBlueDye1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.RadianceGreetingShamanBlueDye2,
					cost: { seasonalCandles: 16 },
				},
				{
					cosmetic: Cosmetic.RadianceGreetingShamanCyanDye1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.HeartGesture3,
					cost: { seasonalCandles: 18 },
					level: 3,
				},
				{ cosmetic: Cosmetic.HeartGesture4, level: 4, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.RadianceGreetingShamanPurpleDye1,
					cost: { seasonalCandles: 20 },
				},
				{
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
					cosmetic: Cosmetic.RadianceGreetingShamanCyanDye2,
					seasonPass: true,
				},
			],
			[
				{
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
