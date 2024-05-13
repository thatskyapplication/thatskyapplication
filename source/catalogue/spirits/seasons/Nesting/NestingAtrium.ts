/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, SeasonalSpirit } from "../../../../Structures/Spirits.js";
import {
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const hairEmoji = HAIR_EMOJIS.Hair142;
const { LargePlaceableProp39, LargePlaceableProp40 } = LARGE_PLACEABLE_PROPS_EMOJIS;
const { SmallPlaceableProp40 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.NestingAtrium,
	season: SeasonName.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Prop 1", cost: { seasonalCandles: 16 }, emoji: SmallPlaceableProp40 })
			.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 2, { item: "Blessing 2", cost: { seasonalCandles: 20 }, emoji: blessing3 })
			.set(1 << 3, { item: "Prop 2", cost: null, emoji: LargePlaceableProp39 })
			.set(1 << 4, { item: "Hair", cost: { seasonalCandles: 24 }, emoji: hairEmoji })
			.set(1 << 5, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 6, { item: "Blessing 4", cost: { seasonalCandles: 28 }, emoji: blessing3 })
			.set(1 << 7, { item: "Prop 3", cost: null, emoji: LargePlaceableProp40 })
			.set(1 << 8, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.NestingHeart }),
	},
});
