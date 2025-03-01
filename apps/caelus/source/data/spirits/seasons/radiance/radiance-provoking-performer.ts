import {
	Cosmetic,
	SeasonId,
	SeasonalSpirit,
	SpiritEmote,
	SpiritId,
} from "@thatskyapplication/utility";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const { DyeGreen, DyeYellow, DyeWhite } = MISCELLANEOUS_EMOJIS;
const emote = SpiritEmote.HypeDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const outfitEmoji = OUTFIT_EMOJIS.Outfit76;
const shoeEmoji = SHOE_EMOJIS.Shoe18;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory53;
const capeEmoji = CAPE_EMOJIS.Cape143;
const heldPropEmoji = HELD_PROPS_EMOJIS.HeldProp50;

export default new SeasonalSpirit({
	id: SpiritId.RadianceProvokingPerformer,
	seasonId: SeasonId.Radiance,
	emote,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.HypeDance1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.HypeDance2, emoji: emoteEmoji },
			{
				name: "Green dye 1",
				cosmetic: Cosmetic.RadianceProvokingPerformerGreenDye1,
				cost: { seasonalCandles: 10 },
				emoji: DyeGreen,
			},
			{
				name: "Head accessory",
				cosmetic: Cosmetic.RadianceProvokingPerformerHeadAccessory,
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Green dye 2",
				cosmetic: Cosmetic.RadianceProvokingPerformerGreenDye2,
				cost: { seasonalCandles: 14 },
				emoji: DyeGreen,
			},
			{
				name: "Cymbals",
				cosmetic: Cosmetic.RadianceProvokingPerformerCymbals,
				emoji: heldPropEmoji,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.HypeDance3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.HypeDance4, emoji: emoteEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.RadianceProvokingPerformerOutfit,
				cost: { seasonalCandles: 24 },
				emoji: outfitEmoji,
			},
			{
				name: "Yellow dye 1",
				cosmetic: Cosmetic.RadianceProvokingPerformerYellowDye1,
				emoji: DyeYellow,
			},
			{
				name: "Yellow dye 2",
				cosmetic: Cosmetic.RadianceProvokingPerformerYellowDye2,
				cost: { seasonalCandles: 32 },
				emoji: DyeYellow,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.RadianceProvokingPerformerCape,
				emoji: capeEmoji,
			},
			{
				name: "Shoes",
				cosmetic: Cosmetic.RadianceProvokingPerformerShoes,
				cost: { seasonalCandles: 38 },
				emoji: shoeEmoji,
			},
			{ name: "White dye", cosmetic: Cosmetic.RadianceProvokingPerformerWhiteDye, emoji: DyeWhite },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.RadianceProvokingPerformerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RadianceHeart,
			},
		],
	},
});
