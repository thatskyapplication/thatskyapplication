import {
	Cosmetic,
	RealmName,
	SeasonId,
	SpiritName,
	SpiritStance,
} from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritStanceToEmoji } from "../../../../utility/spirits.js";

const stance = SpiritStance.Laidback;
const stanceEmoji = SpiritStanceToEmoji[stance];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask14;
const hairEmoji = HAIR_EMOJIS.Hair43;
const heldProp = HELD_PROPS_EMOJIS.HeldProp11;

export default new SeasonalSpirit({
	name: SpiritName.LaidbackPioneer,
	seasonId: SeasonId.Lightseekers,
	stance,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceLaidback, emoji: stanceEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.LaidbackPioneerMask,
				cost: { seasonalCandles: 6 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.LaidbackPioneerBlessing1, emoji: blessing2 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LaidbackPioneerBlessing2,
				cost: { seasonalCandles: 8 },
				emoji: blessing2,
			},
			{ name: "Music sheet", cosmetic: Cosmetic.LaidbackPioneerMusicSheet, emoji: musicSheet },
			{
				name: "Hair",
				cosmetic: Cosmetic.LaidbackPioneerHair,
				cost: { seasonalCandles: 10 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.LaidbackPioneerBlessing3, emoji: blessing2 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.LaidbackPioneerBlessing4,
				cost: { seasonalCandles: 20 },
				emoji: blessing2,
			},
			{ name: "Umbrella", cosmetic: Cosmetic.LaidbackPioneerUmbrella, emoji: heldProp },
		],
		current: [
			{ name: `${stance} stance`, cosmetic: Cosmetic.StanceLaidback, emoji: stanceEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LaidbackPioneerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.LaidbackPioneerMask,
				cost: { candles: 30 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LaidbackPioneerHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LaidbackPioneerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LaidbackPioneerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Music sheet",
				cosmetic: Cosmetic.LaidbackPioneerMusicSheet,
				cost: { candles: 15 },
				emoji: musicSheet,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.LaidbackPioneerHair,
				cost: { candles: 18 },
				emoji: hairEmoji,
			},
			{
				name: "Umbrella",
				cosmetic: Cosmetic.LaidbackPioneerUmbrella,
				cost: { candles: 75 },
				emoji: heldProp,
			},
		],
	},
	visits: {
		travelling: [3, 23, 72],
	},
	hasMarketingVideo: true,
	keywords: ["umbrella"],
});
