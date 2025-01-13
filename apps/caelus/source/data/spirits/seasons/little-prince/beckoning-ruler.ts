import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Beckon;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask51;
const hairEmoji = HAIR_EMOJIS.Hair88;

export default new SeasonalSpirit({
	name: SpiritName.BeckoningRuler,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBeckon1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBeckon2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BeckoningRulerBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing2,
			},
			{ name: "Hair", cosmetic: Cosmetic.BeckoningRulerHair, emoji: hairEmoji },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBeckon3,
				cost: { seasonalCandles: 20 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBeckon4, emoji: emoteEmoji },
			{
				name: "Frog mask",
				cosmetic: Cosmetic.BeckoningRulerFrogMask,
				cost: { seasonalCandles: 26 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.BeckoningRulerBlessing2, emoji: blessing2 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.BeckoningRulerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.LittlePrinceHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBeckon1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteBeckon2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.BeckoningRulerSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.BeckoningRulerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Frog mask",
				cosmetic: Cosmetic.BeckoningRulerFrogMask,
				cost: { candles: 42 },
				emoji: maskEmoji,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.BeckoningRulerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBeckon3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteBeckon4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.BeckoningRulerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.BeckoningRulerHair,
				cost: { candles: 48 },
				emoji: hairEmoji,
			},
		],
	},
	keywords: ["frog", "frog mask"],
	visits: {
		travelling: [71, 117],
	},
});
