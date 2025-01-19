import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const { DyeBlue, DyeCyan, DyePurple, DyeBlack } = MISCELLANEOUS_EMOJIS;
const emote = SpiritEmote.HeartGesture;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const outfitEmoji = OUTFIT_EMOJIS.Outfit77;
const hairEmoji = HAIR_EMOJIS.Hair156;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory54;

export default new SeasonalSpirit({
	name: SpiritName.RadianceGreetingShaman,
	seasonId: SeasonId.Radiance,
	emote,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.HeartGesture1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.HeartGesture2, emoji: emoteEmoji },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.RadianceGreetingShamanHairAccessory,
				cost: { seasonalCandles: 14 },
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Blue dye 1",
				cosmetic: Cosmetic.RadianceGreetingShamanBlueDye1,
				emoji: DyeBlue,
			},
			{
				name: "Blue dye 2",
				cosmetic: Cosmetic.RadianceGreetingShamanBlueDye2,
				cost: { seasonalCandles: 16 },
				emoji: DyeBlue,
			},
			{
				name: "Cyan dye 1",
				cosmetic: Cosmetic.RadianceGreetingShamanCyanDye1,
				emoji: DyeCyan,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.HeartGesture3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.HeartGesture4, emoji: emoteEmoji },
			{
				name: "Purple dye 1",
				cosmetic: Cosmetic.RadianceGreetingShamanPurpleDye1,
				cost: { seasonalCandles: 20 },
				emoji: DyePurple,
			},
			{
				name: "Black dye",
				cosmetic: Cosmetic.RadianceGreetingShamanBlackDye,
				emoji: DyeBlack,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.RadianceGreetingShamanHair,
				cost: { seasonalCandles: 24 },
				emoji: hairEmoji,
			},
			{
				name: "Cyan dye 2",
				cosmetic: Cosmetic.RadianceGreetingShamanCyanDye2,
				emoji: DyeCyan,
			},
			{
				name: "Purple dye 2",
				cosmetic: Cosmetic.RadianceGreetingShamanPurpleDye2,
				cost: { seasonalCandles: 28 },
				emoji: DyePurple,
			},
			{ name: "Outfit", cosmetic: Cosmetic.RadianceGreetingShamanOutfit, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RadianceGreetingShamanSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RadianceHeart,
			},
		],
	},
});
