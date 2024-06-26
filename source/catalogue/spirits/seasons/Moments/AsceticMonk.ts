import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.BlindfoldBalancePose;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit48;
const maskEmoji = MASK_EMOJIS.Mask82;
const hairEmoji = HAIR_EMOJIS.Hair128;

export default new SeasonalSpirit({
	name: SpiritName.AsceticMonk,
	season: SeasonName.Moments,
	emote,
	realm: RealmName.DaylightPrairie,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 6 }, emoji: blessing3 },
			{ name: "Mask", bit: 1 << 3, emoji: maskEmoji },
			{ name: "Hair", bit: 1 << 4, cost: { seasonalCandles: 18 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing3 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 26 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Outfit", bit: 1 << 8, cost: { seasonalCandles: 32 }, emoji: outfitEmoji },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 10,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.MomentsHeart,
			},
		],
	},
});
