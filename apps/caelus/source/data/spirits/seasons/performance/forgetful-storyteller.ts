import { Cosmetic, RealmName, SeasonId, SpiritEmote, SpiritId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmoteToEmoji } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Aww;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit32;
const maskEmoji = MASK_EMOJIS.Mask63;
const hairEmoji = HAIR_EMOJIS.Hair106;
const capeEmoji = CAPE_EMOJIS.Cape79;

export default new SeasonalSpirit({
	id: SpiritId.ForgetfulStoryteller,
	seasonId: SeasonId.Performance,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAww1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteAww2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ForgetfulStorytellerBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing3,
			},
			{ name: "Mask", cosmetic: Cosmetic.ForgetfulStorytellerMask, emoji: maskEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.ForgetfulStorytellerHair,
				cost: { seasonalCandles: 16 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.ForgetfulStorytellerBlessing2, emoji: blessing3 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAww3,
				cost: { seasonalCandles: 20 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteAww4, emoji: emoteEmoji },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.ForgetfulStorytellerBlessing3,
				cost: { seasonalCandles: 26 },
				emoji: blessing3,
			},
			{ name: "Outfit", cosmetic: Cosmetic.ForgetfulStorytellerOutfit, emoji: outfitEmoji },
			{
				name: "Cape",
				cosmetic: Cosmetic.ForgetfulStorytellerCape,
				cost: { seasonalCandles: 34 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.ForgetfulStorytellerBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.ForgetfulStorytellerSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PerformanceHeart,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteAww1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteAww2, cost: { hearts: 4 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.ForgetfulStorytellerBlessing1,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Mask",
				cosmetic: Cosmetic.ForgetfulStorytellerMask,
				cost: { candles: 34 },
				emoji: maskEmoji,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.ForgetfulStorytellerSeasonalHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.ForgetfulStorytellerWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteAww3,
				cost: { hearts: 3 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteAww4, cost: { hearts: 6 }, emoji: emoteEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.ForgetfulStorytellerHair,
				cost: { candles: 44 },
				emoji: hairEmoji,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.ForgetfulStorytellerBlessing2,
				cost: { candles: 5 },
				emoji: blessing3,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.ForgetfulStorytellerOutfit,
				cost: { candles: 70 },
				emoji: outfitEmoji,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.ForgetfulStorytellerCape,
				cost: { candles: 70 },
				emoji: capeEmoji,
			},
		],
	},
	visits: {
		travelling: [133],
	},
});
