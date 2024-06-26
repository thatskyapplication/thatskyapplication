import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.PullUp;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const hairEmoji = HAIR_EMOJIS.Hair124;
const capeEmoji = CAPE_EMOJIS.Cape103;
const heldProp = HELD_PROPS_EMOJIS.HeldProp34;

export default new SeasonalSpirit({
	name: SpiritName.OveractiveOverachiever,
	season: SeasonName.Passage,
	emote,
	realm: RealmName.IslesOfDawn,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 14 }, emoji: blessing3 },
			{ name: "Manta ocarina", bit: 1 << 3, emoji: heldProp },
			{ name: `${emote} 3`, bit: 1 << 4, cost: { seasonalCandles: 22 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 5, emoji: emoteEmoji },
			{ name: "Cape", bit: 1 << 6, cost: { seasonalCandles: 30 }, emoji: capeEmoji },
			{ name: "Blessing 2", bit: 1 << 7, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 8, cost: { seasonalCandles: 32 }, emoji: blessing3 },
			{ name: "Hair", bit: 1 << 9, emoji: hairEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 10,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.PassageHeart,
			},
		],
	},
});
