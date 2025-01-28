import { Cosmetic, SeasonId, SpiritName } from "@thatskyapplication/utility";
import { SeasonalSpirit } from "../../../../models/Spirits.js";
import {
	CAPE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const capeEmoji = CAPE_EMOJIS.Cape129;
const { LargePlaceableProp37, LargePlaceableProp38 } = LARGE_PLACEABLE_PROPS_EMOJIS;
const { SmallPlaceableProp39 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.NestingLoft,
	seasonId: SeasonId.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.NestingLoftBlessing1,
				cost: { seasonalCandles: 12 },
				emoji: blessing3,
			},
			{ name: "Prop 1", cosmetic: Cosmetic.NestingLoftProp1, emoji: LargePlaceableProp37 },
			{
				name: "Prop 2",
				cosmetic: Cosmetic.NestingLoftProp2,
				cost: { seasonalCandles: 20 },
				emoji: LargePlaceableProp38,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.NestingLoftBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.NestingLoftBlessing3,
				cost: { seasonalCandles: 28 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.NestingLoftCape, emoji: capeEmoji },
			{
				name: "Prop 3",
				cosmetic: Cosmetic.NestingLoftProp3,
				cost: { seasonalCandles: 36 },
				emoji: SmallPlaceableProp39,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.NestingLoftBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NestingLoftSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NestingHeart,
			},
		],
	},
});
