/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { type ItemsData, SeasonalSpirit } from "../../../Structures/Spirits.js";
import {
	CAPE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";
import { SeasonName } from "../../../Utility/seasons.js";
import { SpiritName } from "../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const capeEmoji = CAPE_EMOJIS.Cape129;
const { LargePlaceableProp37, LargePlaceableProp38 } = LARGE_PLACEABLE_PROPS_EMOJIS;
const { SmallPlaceableProp39 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.NestingLoft,
	season: SeasonName.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Blessing 1", cost: { seasonalCandles: 12 }, emoji: blessing3 })
			.set(1 << 1, { item: "Prop 1", cost: null, emoji: LargePlaceableProp37 })
			.set(1 << 2, { item: "Prop 2", cost: { seasonalCandles: 20 }, emoji: LargePlaceableProp38 })
			.set(1 << 3, { item: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 4, { item: "Blessing 3", cost: { seasonalCandles: 28 }, emoji: blessing3 })
			.set(1 << 5, { item: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 6, { item: "Prop 3", cost: { seasonalCandles: 36 }, emoji: SmallPlaceableProp39 })
			.set(1 << 7, { item: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 8, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.NestingHeart }),
	},
});
