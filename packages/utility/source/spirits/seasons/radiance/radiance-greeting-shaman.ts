import { Cosmetic } from "../../../cosmetics.js";
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
			{ cosmetic: Cosmetic.HeartGesture1 },
			{ cosmetic: Cosmetic.HeartGesture2 },
			{
				cosmetic: Cosmetic.RadianceGreetingShamanHairAccessory,
				cost: { seasonalCandles: 14 },
			},
			{
				cosmetic: Cosmetic.RadianceGreetingShamanBlueDye1,
			},
			{
				cosmetic: Cosmetic.RadianceGreetingShamanBlueDye2,
				cost: { seasonalCandles: 16 },
			},
			{
				cosmetic: Cosmetic.RadianceGreetingShamanCyanDye1,
			},
			{
				cosmetic: Cosmetic.HeartGesture3,
				cost: { seasonalCandles: 18 },
			},
			{ cosmetic: Cosmetic.HeartGesture4 },
			{
				cosmetic: Cosmetic.RadianceGreetingShamanPurpleDye1,
				cost: { seasonalCandles: 20 },
			},
			{
				cosmetic: Cosmetic.RadianceGreetingShamanBlackDye,
			},
			{
				cosmetic: Cosmetic.RadianceGreetingShamanHair,
				cost: { seasonalCandles: 24 },
			},
			{
				cosmetic: Cosmetic.RadianceGreetingShamanCyanDye2,
			},
			{
				cosmetic: Cosmetic.RadianceGreetingShamanPurpleDye2,
				cost: { seasonalCandles: 28 },
			},
			{ cosmetic: Cosmetic.RadianceGreetingShamanOutfit },
			{
				cosmetic: Cosmetic.RadianceGreetingShamanSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
