/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import {
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import { SpiritName } from "../../../../Utility/spirits.js";
import { type ItemsData, SeasonalSpirit } from "../../Base.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const { LargePlaceableProp34, LargePlaceableProp35, LargePlaceableProp36 } = LARGE_PLACEABLE_PROPS_EMOJIS;
const { SmallPlaceableProp38 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.NestingSolarium,
	season: SeasonName.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Blessing 1", cost: { seasonalCandles: 14 }, emoji: blessing3 })
			.set(1 << 1, { item: "Prop 1", cost: null, emoji: SmallPlaceableProp38 })
			.set(1 << 2, { item: "Prop 2", cost: { seasonalCandles: 22 }, emoji: LargePlaceableProp34 })
			.set(1 << 3, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 4, { item: "Blessing 3", cost: { seasonalCandles: 30 }, emoji: blessing3 })
			.set(1 << 5, { item: "Prop 3", cost: null, emoji: LargePlaceableProp35 })
			.set(1 << 6, { item: "Prop 4", cost: { seasonalCandles: 34 }, emoji: LargePlaceableProp36 })
			.set(1 << 7, { item: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 8, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.NestingHeart }),
	},
});
