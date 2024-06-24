import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritName, SpiritEmoteToEmoji } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Tiptoeing;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit42;
const hairEmoji = HAIR_EMOJIS.Hair121;
const capeEmoji = CAPE_EMOJIS.Cape100;

export default new SeasonalSpirit({
	name: SpiritName.TiptoeingTeaBrewer,
	season: SeasonName.Remembrance,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 14 }, emoji: blessing3 },
			{ name: "Hair", bit: 1 << 3, emoji: hairEmoji },
			{ name: `${emote} 3`, bit: 1 << 4, cost: { seasonalCandles: 24 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, emoji: emoteEmoji },
			{ name: "Blessing 2", bit: 1 << 6, cost: { seasonalCandles: 34 }, emoji: blessing3 },
			{ name: "Outfit", bit: 1 << 7, emoji: outfitEmoji },
			{ name: "Cape", bit: 1 << 8, cost: { seasonalCandles: 38 }, emoji: capeEmoji },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing3 },
			{ name: "Seasonal heart", bit: 1 << 10, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.RemembranceHeart },
		],
	},
});
