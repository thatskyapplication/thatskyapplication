import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const { LargePlaceableProp34, LargePlaceableProp35, LargePlaceableProp36 } =
	LARGE_PLACEABLE_PROPS_EMOJIS;
const { SmallPlaceableProp38 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.NestingSolarium,
	seasonId: SeasonId.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.NestingSolariumBlessing1,
				cost: { seasonalCandles: 14 },
				emoji: blessing3,
			},
			{ name: "Prop 1", cosmetic: Cosmetic.NestingSolariumProp1, emoji: SmallPlaceableProp38 },
			{
				name: "Prop 2",
				cosmetic: Cosmetic.NestingSolariumProp2,
				cost: { seasonalCandles: 22 },
				emoji: LargePlaceableProp34,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.NestingSolariumBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.NestingSolariumBlessing3,
				cost: { seasonalCandles: 30 },
				emoji: blessing3,
			},
			{ name: "Prop 3", cosmetic: Cosmetic.NestingSolariumProp3, emoji: LargePlaceableProp35 },
			{
				name: "Prop 4",
				cosmetic: Cosmetic.NestingSolariumProp4,
				cost: { seasonalCandles: 34 },
				emoji: LargePlaceableProp36,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.NestingSolariumBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NestingSolariumSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NestingHeart,
			},
		],
	},
});
