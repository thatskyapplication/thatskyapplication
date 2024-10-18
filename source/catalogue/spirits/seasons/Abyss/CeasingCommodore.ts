import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.CalmDown;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const maskEmoji = MASK_EMOJIS.Mask53;
const hairEmoji = HAIR_EMOJIS.Hair99;
const capeEmoji = CAPE_EMOJIS.Cape69;

export default new SeasonalSpirit({
	name: SpiritName.CeasingCommodore,
	seasonId: SeasonId.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCalmDown1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteCalmDown2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CeasingCommodoreBlessing1,
				cost: { seasonalCandles: 6 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.CeasingCommodoreHair, emoji: hairEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.CeasingCommodoreMask,
				cost: { seasonalCandles: 8 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.CeasingCommodoreBlessing2, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCalmDown3,
				cost: { seasonalCandles: 16 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteCalmDown4, emoji: emoteEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.CeasingCommodoreCape,
				cost: { seasonalCandles: 20 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.CeasingCommodoreBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.CeasingCommodoreSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AbyssHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteCalmDown1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteCalmDown2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.CeasingCommodoreBlessing1,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.CeasingCommodoreHair,
				cost: { candles: 45 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.CeasingCommodoreSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.CeasingCommodoreWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteCalmDown3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteCalmDown4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.CeasingCommodoreBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.CeasingCommodoreMask,
				cost: { candles: 40 },
				emoji: maskEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.CeasingCommodoreCape,
				cost: { candles: 20 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		returning: [5],
	},
});
