import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.EvilLaugh;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask54;
const hairEmoji = HAIR_EMOJIS.Hair98;
const capeEmoji = CAPE_EMOJIS.Cape70;

export default new SeasonalSpirit({
	name: SpiritName.CacklingCannoneer,
	season: SeasonName.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	offer: {
		current: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, cost: { hearts: 4 }, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Mask", bit: 1 << 4, cost: { candles: 40 }, emoji: maskEmoji },
			{ name: "Heart", bit: 1 << 12, cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart },
			{
				name: "Wing buff",
				bit: 1 << 13,
				cost: { ascendedCandles: 2 },
				emoji: MISCELLANEOUS_EMOJIS.WingBuff,
			},
			{ name: `${emote} 3`, bit: 1 << 6, cost: { hearts: 3 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, cost: { hearts: 6 }, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 11, cost: { candles: 50 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 5, cost: { candles: 5 }, emoji: blessing2 },
			{ name: "Cape", bit: 1 << 8, cost: { candles: 70 }, emoji: capeEmoji },
			{ name: "Music sheet", bit: 1 << 3, cost: { candles: 15 }, emoji: musicSheet },
		],
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 12 }, emoji: blessing2 },
			{ name: "Music sheet", bit: 1 << 3, emoji: musicSheet },
			{ name: "Mask", bit: 1 << 4, cost: { seasonalCandles: 16 }, emoji: maskEmoji },
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing3 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 20 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Cape", bit: 1 << 8, cost: { seasonalCandles: 26 }, emoji: capeEmoji },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing3 },
			{ name: "Blessing 4", bit: 1 << 10, cost: { seasonalCandles: 34 }, emoji: blessing3 },
			{ name: "Hair", bit: 1 << 11, emoji: hairEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 12,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AbyssHeart,
			},
		],
	},
	visits: {
		returning: [4],
	},
});
