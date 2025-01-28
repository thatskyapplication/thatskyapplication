import { SeasonId } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import {
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const hairEmoji = HAIR_EMOJIS.Hair142;
const { LargePlaceableProp39, LargePlaceableProp40 } = LARGE_PLACEABLE_PROPS_EMOJIS;
const { SmallPlaceableProp40 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.NestingAtrium,
	seasonId: SeasonId.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Prop 1",
				cosmetic: Cosmetic.NestingAtriumProp1,
				cost: { seasonalCandles: 16 },
				emoji: SmallPlaceableProp40,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.NestingAtriumBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.NestingAtriumBlessing2,
				cost: { seasonalCandles: 20 },
				emoji: blessing3,
			},
			{ name: "Prop 2", cosmetic: Cosmetic.NestingAtriumProp2, emoji: LargePlaceableProp39 },
			{
				name: "Hair",
				cosmetic: Cosmetic.NestingAtriumHair,
				cost: { seasonalCandles: 24 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.NestingAtriumBlessing3, emoji: blessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.NestingAtriumBlessing4,
				cost: { seasonalCandles: 28 },
				emoji: blessing3,
			},
			{ name: "Prop 3", cosmetic: Cosmetic.NestingAtriumProp3, emoji: LargePlaceableProp40 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NestingAtriumSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NestingHeart,
			},
		],
	},
});
