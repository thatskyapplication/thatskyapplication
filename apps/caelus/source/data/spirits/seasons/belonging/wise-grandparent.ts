import { RealmName } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	CAPE_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName, SpiritStance, SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Wise;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing1 = MISCELLANEOUS_EMOJIS.Blessing1;
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask19;
const capeEmoji = CAPE_EMOJIS.Cape22;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp09;

export default new SeasonalSpirit({
	name: SpiritName.WiseGrandparent,
	seasonId: SeasonId.Belonging,
	stance,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceWise, emoji: stanceEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WiseGrandparentBlessing1,
				cost: { seasonalCandles: 10 },
				emoji: blessing1,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.WiseGrandparentMusicSheet, emoji: musicSheet },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WiseGrandparentBlessing2,
				cost: { seasonalCandles: 12 },
				emoji: blessing2,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.WiseGrandparentBlessing3, emoji: blessing2 },
			{
				name: "Mask",
				cosmetic: Cosmetic.WiseGrandparentMask,
				cost: { seasonalCandles: 14 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.WiseGrandparentBlessing4, emoji: blessing2 },
			{
				name: "Blessing 5",
				cosmetic: Cosmetic.WiseGrandparentBlessing5,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{ name: "Cape", cosmetic: Cosmetic.WiseGrandparentCape, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.WiseGrandparentSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.BelongingHeart,
			},
		],
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceWise, emoji: stanceEmoji },
			{
				name: "Music sheet",
				cosmetic: Cosmetic.WiseGrandparentMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.WiseGrandparentSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.WiseGrandparentBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.WiseGrandparentWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.WiseGrandparentBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.WiseGrandparentCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.WiseGrandparentProp,
				cost: { candles: 10 },
				emoji: placeablePropEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.WiseGrandparentMask,
				cost: { candles: 48 },
				emoji: maskEmoji,
			},
		],
	},
	visits: {
		travelling: [15, 48, 100],
	},
});
