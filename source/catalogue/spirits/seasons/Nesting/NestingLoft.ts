import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const capeEmoji = CAPE_EMOJIS.Cape129;
const { LargePlaceableProp37, LargePlaceableProp38 } = LARGE_PLACEABLE_PROPS_EMOJIS;
const { SmallPlaceableProp39 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.NestingLoft,
	season: SeasonName.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: "Blessing 1", bit: 1 << 0, cost: { seasonalCandles: 12 }, emoji: blessing3 },
			{ name: "Prop 1", bit: 1 << 1, emoji: LargePlaceableProp37 },
			{ name: "Prop 2", bit: 1 << 2, cost: { seasonalCandles: 20 }, emoji: LargePlaceableProp38 },
			{ name: "Blessing 2", bit: 1 << 3, emoji: blessing3 },
			{ name: "Blessing 3", bit: 1 << 4, cost: { seasonalCandles: 28 }, emoji: blessing3 },
			{ name: "Cape", bit: 1 << 5, emoji: capeEmoji },
			{ name: "Prop 3", bit: 1 << 6, cost: { seasonalCandles: 36 }, emoji: SmallPlaceableProp39 },
			{ name: "Blessing 4", bit: 1 << 7, emoji: blessing3 },
			{ name: "Seasonal heart", bit: 1 << 8, cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.NestingHeart },
		],
	},
});
