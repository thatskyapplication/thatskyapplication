import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit60;
const hairEmoji = HAIR_EMOJIS.Hair146;
const smallPlaceablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp73;

export default new SeasonalSpirit({
	name: SpiritName.TheCellistsBeginnings,
	season: SeasonName.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: "Hair", bit: 1 << 0, cost: { seasonalCandles: 20 }, emoji: hairEmoji },
			{ name: "Blessing 1", bit: 1 << 1, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 2, cost: { seasonalCandles: 26 }, emoji: blessing3 },
			{ name: "Prop", bit: 1 << 3, emoji: smallPlaceablePropEmoji },
			{ name: "Outfit", bit: 1 << 4, cost: { seasonalCandles: 32 }, emoji: outfitEmoji },
			{ name: "Blessing 4", bit: 1 << 5, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 6,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
