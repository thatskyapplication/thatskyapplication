/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SeasonName } from "../../../Season.js";
import { type ItemsData, SeasonalSpirit, SpiritName } from "../../Base.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory38;
const { LargePlaceableProp41 } = LARGE_PLACEABLE_PROPS_EMOJIS;
const { SmallPlaceableProp41, SmallPlaceableProp42 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.NestingNook,
	season: SeasonName.Nesting,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: new Collection<number, ItemsData>()
			.set(1 << 0, { item: "Prop 1", cost: { seasonalCandles: 16 }, emoji: SmallPlaceableProp41 })
			.set(1 << 1, { item: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 2, { item: "Blessing 2", cost: { seasonalCandles: 20 }, emoji: blessing3 })
			.set(1 << 3, { item: "Prop 2", cost: null, emoji: LargePlaceableProp41 })
			.set(1 << 4, { item: "Prop 3", cost: { seasonalCandles: 26 }, emoji: SmallPlaceableProp42 })
			.set(1 << 5, { item: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 6, { item: "Blessing 4", cost: { seasonalCandles: 30 }, emoji: blessing3 })
			.set(1 << 7, { item: "Hair accessory", cost: null, emoji: hairAccessoryEmoji })
			.set(1 << 8, { item: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.NestingHeart }),
	},
});
