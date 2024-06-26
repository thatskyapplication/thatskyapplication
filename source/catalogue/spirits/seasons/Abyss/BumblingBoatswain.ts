import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Ouch;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing2 = MISCELLANEOUS_EMOJIS.Blessing2;
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask52;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory15;
const capeEmoji = CAPE_EMOJIS.Cape72;

export default new SeasonalSpirit({
	name: SpiritName.BumblingBoatswain,
	season: SeasonName.Abyss,
	emote,
	realm: RealmName.GoldenWasteland,
	hasMarketingVideo: true,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 8 }, emoji: blessing3 },
			{ name: "Mask", bit: 1 << 3, emoji: maskEmoji },
			{ name: "Music sheet", bit: 1 << 4, cost: { seasonalCandles: 12 }, emoji: musicSheet },
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing2 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 16 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Blessing 3", bit: 1 << 8, cost: { seasonalCandles: 20 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 9, emoji: capeEmoji },
			{
				name: "Hair accessory",
				bit: 1 << 10,
				cost: { seasonalCandles: 24 },
				emoji: hairAccessoryEmoji,
			},
			{ name: "Blessing 4", bit: 1 << 11, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 12,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AbyssHeart,
			},
		],
	},
});
