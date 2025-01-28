import { RealmName, SeasonId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../utility/spirits.js";

const emote = SpiritEmote.Leap;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const maskEmoji = MASK_EMOJIS.Mask07;
const heldProp = HELD_PROPS_EMOJIS.HeldProp07;

export default new SeasonalSpirit({
	name: SpiritName.LeapingDancer,
	seasonId: SeasonId.Gratitude,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteLeap1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteLeap2, emoji: emoteEmoji },
			{
				name: "Small bell",
				cosmetic: Cosmetic.LeapingDancerSmallBell,
				cost: { seasonalCandles: 10 },
				emoji: heldProp,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.LeapingDancerBlessing1, emoji: blessing2 },
			{
				name: `${emote} 3`,
				cosmetic: Cosmetic.EmoteLeap3,
				cost: { seasonalCandles: 14 },
				emoji: emoteEmoji,
			},
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteLeap4, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LeapingDancerBlessing2,
				cost: { seasonalCandles: 16 },
				emoji: blessing2,
			},
			{
				name: "Fox mask",
				cosmetic: Cosmetic.LeapingDancerMask,
				cost: { hearts: 5 },
				emoji: maskEmoji,
			},
		],
		current: [
			{ name: `${emote} 1`, cosmetic: Cosmetic.EmoteLeap1, emoji: emoteEmoji },
			{ name: `${emote} 2`, cosmetic: Cosmetic.EmoteLeap2, cost: { hearts: 4 }, emoji: emoteEmoji },
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.LeapingDancerBlessing1,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Small bell",
				cosmetic: Cosmetic.LeapingDancerSmallBell,
				cost: { candles: 40 },
				emoji: heldProp,
			},
			{
				name: "Heart",
				cosmetic: Cosmetic.LeapingDancingHeart,
				cost: { candles: 3 },
				emoji: MISCELLANEOUS_EMOJIS.Heart,
			},
			{
				name: "Wing buff",
				cosmetic: Cosmetic.LeapingDancingWingBuff,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, cosmetic: Cosmetic.EmoteLeap3, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, cosmetic: Cosmetic.EmoteLeap4, cost: { hearts: 6 }, emoji: emoteEmoji },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.LeapingDancerBlessing2,
				cost: { candles: 5 },
				emoji: blessing2,
			},
			{
				name: "Fox mask",
				cosmetic: Cosmetic.LeapingDancerMask,
				cost: { candles: 54 },
				emoji: maskEmoji,
			},
		],
	},
	keywords: ["fox", "fox mask"],
	visits: {
		travelling: [12, 31, 115],
		returning: [3],
	},
});
