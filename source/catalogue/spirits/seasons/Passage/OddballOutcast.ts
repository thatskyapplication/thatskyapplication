import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.HackySack;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit46;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace30;
const hairEmoji = HAIR_EMOJIS.Hair125;

export default new SeasonalSpirit({
	name: SpiritName.OddballOutcast,
	season: SeasonName.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Hair", bit: 1 << 2, cost: { seasonalCandles: 14 }, emoji: hairEmoji },
			{ name: "Blessing 1", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 4, cost: { seasonalCandles: 18 }, emoji: blessing3 },
			{ name: "Neck accessory", bit: 1 << 5, emoji: necklaceEmoji },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 24 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Outfit", bit: 1 << 8, cost: { seasonalCandles: 32 }, emoji: outfitEmoji },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing3 },
			{ name: "Seasonal heart", bit: 1 << 10, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.PassageHeart },
		],
	},
});
