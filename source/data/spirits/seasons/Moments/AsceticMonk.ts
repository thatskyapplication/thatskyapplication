import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.BlindfoldBalancePose;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit48;
const maskEmoji = MASK_EMOJIS.Mask82;
const hairEmoji = HAIR_EMOJIS.Hair128;

export default new SeasonalSpirit({
	name: SpiritName.AsceticMonk,
	seasonId: SeasonId.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteBlindfoldBalancePose1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteBlindfoldBalancePose2, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.AsceticMonkBlessing1,
				cost: { seasonalCandles: 6 },
				emoji: blessing3,
			},
			{ name: "Mask", cosmetic: Cosmetic.AsceticMonkMask, emoji: maskEmoji },
			{
				name: "Hair",
				cosmetic: Cosmetic.AsceticMonkHair,
				cost: { seasonalCandles: 18 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.AsceticMonkBlessing2, emoji: blessing3 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteBlindfoldBalancePose3,
				cost: { seasonalCandles: 26 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteBlindfoldBalancePose4, emoji: emoteEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.AsceticMonkOutfit,
				cost: { seasonalCandles: 32 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.AsceticMonkBlessing3, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.AsceticMonkSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.MomentsHeart,
			},
		],
	},
});
