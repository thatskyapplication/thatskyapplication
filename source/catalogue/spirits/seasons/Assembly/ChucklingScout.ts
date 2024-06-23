import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Chuckle;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const outfitEmoji = OUTFIT_EMOJIS.Outfit20;
const maskEmoji = MASK_EMOJIS.Mask46;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp11;

export default new SeasonalSpirit({
	name: SpiritName.ChucklingScout,
	season: SeasonName.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Mask", bit: 1 << 3, cost: { seasonalCandles: 12 }, emoji: maskEmoji },
			{ name: "Blessing 1", bit: 1 << 2, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 14 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 9, cost: { seasonalCandles: 17 }, emoji: blessing2 },
			{ name: "Outfit", bit: 1 << 8, emoji: outfitEmoji },
			{ name: "Prop", bit: 1 << 10, cost: { seasonalCandles: 20 }, emoji: placeablePropEmoji },
			{ name: "Blessing 3", bit: 1 << 11, emoji: blessing2 },
			{ name: "Seasonal heart", bit: 1 << 4, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AssemblyHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 3, cost: { candles: 36 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 5, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Outfit", bit: 1 << 8, cost: { candles: 65 }, emoji: outfitEmoji },
			{ name: "Blessing 2", bit: 1 << 9, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Prop", bit: 1 << 10, cost: { candles: 45 }, emoji: placeablePropEmoji },
		],
	},
	visits: {
		returning: [1],
	},
});
