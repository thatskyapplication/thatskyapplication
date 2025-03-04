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
			{ name: `${emote} 1`, cosmetic: Cosmetic.HeartGesture1 },
			{ name: `${emote} 2`, cosmetic: Cosmetic.HeartGesture2 },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.RadianceGreetingShamanHairAccessory,
				cost: { seasonalCandles: 14 },
			},
			{
				name: "Blue dye 1",
				cosmetic: Cosmetic.RadianceGreetingShamanBlueDye1,
			},
			{
				name: "Blue dye 2",
				cosmetic: Cosmetic.RadianceGreetingShamanBlueDye2,
				cost: { seasonalCandles: 16 },
			},
			{
				name: "Cyan dye 1",
				cosmetic: Cosmetic.RadianceGreetingShamanCyanDye1,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.HeartGesture3,
				cost: { seasonalCandles: 18 },
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.HeartGesture4 },
			{
				name: "Purple dye 1",
				cosmetic: Cosmetic.RadianceGreetingShamanPurpleDye1,
				cost: { seasonalCandles: 20 },
			},
			{
				name: "Black dye",
				cosmetic: Cosmetic.RadianceGreetingShamanBlackDye,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.RadianceGreetingShamanHair,
				cost: { seasonalCandles: 24 },
			},
			{
				name: "Cyan dye 2",
				cosmetic: Cosmetic.RadianceGreetingShamanCyanDye2,
			},
			{
				name: "Purple dye 2",
				cosmetic: Cosmetic.RadianceGreetingShamanPurpleDye2,
				cost: { seasonalCandles: 28 },
			},
			{ name: "Outfit", cosmetic: Cosmetic.RadianceGreetingShamanOutfit },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RadianceGreetingShamanSeasonalHeart,
				cost: { seasonalCandles: 3 },
			},
		],
	},
});
