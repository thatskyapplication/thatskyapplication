import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji, SpiritName } from "../../../../Utility/spirits.js";

const emote = SpiritEmote.Whistle;
const emoteEmoji = SpiritEmoteToEmoji[emote];
const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit54;
const hairEmoji = HAIR_EMOJIS.Hair137;
const placeablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp34;

export default new SeasonalSpirit({
	name: SpiritName.HerbGatherer,
	season: SeasonName.NineColouredDeer,
	emote,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: `${emote} 1`, bit: 1 << 0, emoji: emoteEmoji },
			{ name: `${emote} 2`, bit: 1 << 1, emoji: emoteEmoji },
			{ name: "Blessing 1", bit: 1 << 2, cost: { seasonalCandles: 16 }, emoji: blessing3 },
			{ name: "Outfit", bit: 1 << 3, emoji: outfitEmoji },
			{ name: "Hair", bit: 1 << 4, cost: { seasonalCandles: 26 }, emoji: hairEmoji },
			{ name: "Blessing 2", bit: 1 << 5, emoji: blessing3 },
			{ name: `${emote} 3`, bit: 1 << 6, cost: { seasonalCandles: 30 }, emoji: emoteEmoji },
			{ name: `${emote} 4`, bit: 1 << 7, emoji: emoteEmoji },
			{ name: "Prop", bit: 1 << 8, cost: { seasonalCandles: 36 }, emoji: placeablePropEmoji },
			{ name: "Blessing 3", bit: 1 << 9, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 10,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NineColouredDeerHeart,
			},
		],
	},
});
