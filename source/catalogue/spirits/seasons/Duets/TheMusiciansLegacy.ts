import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const heldPropEmoji = HELD_PROPS_EMOJIS.HeldProp44;
const smallPlaceablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp76;

export default new SeasonalSpirit({
	name: SpiritName.TheMusiciansLegacy,
	season: SeasonName.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: "Music sheet", bit: 1 << 0, cost: { seasonalCandles: 14 }, emoji: musicSheet },
			{ name: "Blessing 1", bit: 1 << 1, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 2, cost: { seasonalCandles: 24 }, emoji: blessing3 },
			{ name: "Prop 1", bit: 1 << 3, emoji: smallPlaceablePropEmoji },
			{ name: "Prop 2", bit: 1 << 4, cost: { seasonalCandles: 34 }, emoji: heldPropEmoji },
			{ name: "Blessing 3", bit: 1 << 5, emoji: blessing3 },
			{
				name: "Seasonal heart",
				bit: 1 << 6,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
