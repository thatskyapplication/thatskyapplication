import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { RealmName } from "../../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.SpinTrick;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask39;
const hairEmoji = HAIR_EMOJIS.Hair72;
const capeEmoji = CAPE_EMOJIS.Cape45;

export default new SeasonalSpirit({
	name: SpiritName.SpinningMentor,
	seasonId: SeasonId.Dreams,
	emote,
	realm: RealmName.ValleyOfTriumph,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSpinTrick1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteSpinTrick2, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.SpinningMentorHair,
				cost: { seasonalCandles: 13 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.SpinningMentorBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSpinTrick3,
				cost: { seasonalCandles: 18 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteSpinTrick4, emoji: emoteEmoji },
			{
				name: "Mask",
				cosmetic: Cosmetic.SpinningMentorMask,
				cost: { seasonalCandles: 23 },
				emoji: maskEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.SpinningMentorBlessing2, emoji: blessing2 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.SpinningMentorBlessing3,
				cost: { seasonalCandles: 29 },
				emoji: blessing2,
			},
			{ name: "Cape", cosmetic: Cosmetic.SpinningMentorCape, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SpinningMentorSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DreamsHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteSpinTrick1, emoji: emoteEmoji },
			{
				name: `${emote} 2`,
				cosmetic: Cosmetic.EmoteSpinTrick2,
				cost: { hearts: 4 },
				emoji: emoteEmoji,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SpinningMentorBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Hair",
				cosmetic: Cosmetic.SpinningMentorHair,
				cost: { candles: 44 },
				emoji: hairEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.SpinningMentorSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.SpinningMentorWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteSpinTrick3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{
				name: `${emote} 4`,
				cosmetic: Cosmetic.EmoteSpinTrick4,
				cost: { hearts: 6 },
				emoji: emoteEmoji,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.SpinningMentorMask,
				cost: { candles: 42 },
				emoji: maskEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SpinningMentorBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.SpinningMentorCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: [59, 91, 120],
	},
});
