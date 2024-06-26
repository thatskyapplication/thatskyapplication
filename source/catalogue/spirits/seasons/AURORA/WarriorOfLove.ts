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

const emote = SpiritEmote.Twirl;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const maskEmoji = MASK_EMOJIS.Mask68;
const hairEmoji = HAIR_EMOJIS.Hair113;
const capeEmoji = CAPE_EMOJIS.Cape90;

export default new SeasonalSpirit({
	name: SpiritName.WarriorOfLove,
	season: SeasonName.AURORA,
	emote,
	realm: RealmName.ValleyOfTriumph,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Mask", bit: 1 << 2, cost: { seasonalCandles: 6 }, emoji: maskEmoji },
			{ name: "Blessing 1", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 4, cost: { seasonalCandles: 12 }, emoji: blessing3 },
			{ name: "Hair", bit: 1 << 5, emoji: hairEmoji },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 20 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Music sheet", bit: 1 << 8, cost: { seasonalCandles: 24 }, emoji: musicSheet },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing3 },
			{ name: "Blessing 4", bit: 1 << 10, cost: { seasonalCandles: 30 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 11, emoji: capeEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 12,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.AuroraHeart,
			},
		],
	},
});
