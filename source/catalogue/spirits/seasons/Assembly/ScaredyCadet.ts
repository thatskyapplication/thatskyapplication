import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Eww;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask50;
const hairEmoji = HAIR_EMOJIS.Hair82;
const placeablePropEmoji = LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp07;

export default new SeasonalSpirit({
	name: SpiritName.ScaredyCadet,
	season: SeasonName.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Mask", bit: 1 << 3, cost: { seasonalCandles: 5 }, emoji: maskEmoji },
			{ name: "Blessing 1", bit: 1 << 2, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 10 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Music sheet", bit: 1 << 8, cost: { seasonalCandles: 15 }, emoji: musicSheet },
			{ name: "Hair", bit: 1 << 10, emoji: hairEmoji },
			{ name: "Hammock", bit: 1 << 11, cost: { seasonalCandles: 20 }, emoji: placeablePropEmoji },
			{ name: "Blessing 2", bit: 1 << 9, emoji: blessing2 },
			{ name: "Seasonal heart", bit: 1 << 4, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.AssemblyHeart },
		],
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 3, cost: { candles: 24 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 4, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{ name: "Wing buff", bit: 1 << 5, cost: { ascendedCandles: 2 }, emoji: MISCELLANEOUS_EMOJIS.WingBuff },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Music sheet", bit: 1 << 8, cost: { candles: 15 }, emoji: musicSheet },
			{ name: "Blessing 2", bit: 1 << 9, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Hair", bit: 1 << 10, cost: { candles: 45 }, emoji: hairEmoji },
			{ name: "Hammock", bit: 1 << 11, cost: { candles: 55 }, emoji: placeablePropEmoji },
		],
	},
	keywords: ["hammock"],
	visits: {
		returning: [1],
	},
});
