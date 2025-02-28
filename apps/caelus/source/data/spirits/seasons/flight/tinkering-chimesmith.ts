import { Cosmetic, RealmName, SeasonId, SpiritId, SpiritStance } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Tinker;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const colourTrail = MISCELLANEOUS_EMOJIS.SpellColourTrail;
const outfitEmoji = OUTFIT_EMOJIS.Outfit26;
const hairEmoji = HAIR_EMOJIS.Hair92;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory11;
const heldProp = HELD_PROPS_EMOJIS.HeldProp24;

export default new SeasonalSpirit({
	id: SpiritId.TinkeringChimesmith,
	seasonId: SeasonId.Flight,
	stance,
	realm: RealmName.HiddenForest,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceTinker, emoji: stanceEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TinkeringChimesmithBlessing1,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{ name: "Outfit", cosmetic: Cosmetic.TinkeringChimesmithOutfit, emoji: outfitEmoji },
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.TinkeringChimesmithHairAccessory,
				cost: { seasonalCandles: 22 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.TinkeringChimesmithBlessing2, emoji: blessing2 },
			{
				name: "Trail spell 1",
				cosmetic: Cosmetic.TinkeringChimesmithTrailSpell1,
				cost: { seasonalCandles: 26 },
				emoji: colourTrail,
			},
			{ name: "Kalimba", cosmetic: Cosmetic.TinkeringChimesmithKalimba, emoji: heldProp },
			{
				name: "Hair",
				cosmetic: Cosmetic.TinkeringChimesmithHair,
				cost: { seasonalCandles: 28 },
				emoji: hairEmoji,
			},
			{
				name: "Trail spell 2",
				cosmetic: Cosmetic.TinkeringChimesmithTrailSpell2,
				emoji: colourTrail,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TinkeringChimesmithSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.FlightHeart,
			},
		],
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceTinker, emoji: stanceEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.TinkeringChimesmithBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.TinkeringChimesmithHair,
				cost: { candles: 45 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.TinkeringChimesmithSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.TinkeringChimesmithWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TinkeringChimesmithBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.TinkeringChimesmithHairAccessory,
				cost: { candles: 35 },
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TinkeringChimesmithOutfit,
				cost: { candles: 70 },
				emoji: outfitEmoji,
			},
			{
				name: "Kalimba",
				cosmetic: Cosmetic.TinkeringChimesmithKalimba,
				cost: { candles: 75 },
				emoji: heldProp,
			},
		],
	},
	visits: {
		travelling: [87],
	},
});
