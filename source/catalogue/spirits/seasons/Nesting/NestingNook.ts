import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory38;
const { LargePlaceableProp41 } = LARGE_PLACEABLE_PROPS_EMOJIS;
const { SmallPlaceableProp41, SmallPlaceableProp42 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.NestingNook,
	season: SeasonName.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{ name: "Prop 1", bit: 1 << 0, cost: { seasonalCandles: 16 }, emoji: SmallPlaceableProp41 },
			{ name: "Blessing 1", bit: 1 << 1, emoji: blessing3 },
			{ name: "Blessing 2", bit: 1 << 2, cost: { seasonalCandles: 20 }, emoji: blessing3 },
			{ name: "Prop 2", bit: 1 << 3, emoji: LargePlaceableProp41 },
			{ name: "Prop 3", bit: 1 << 4, cost: { seasonalCandles: 26 }, emoji: SmallPlaceableProp42 },
			{ name: "Blessing 3", bit: 1 << 5, emoji: blessing3 },
			{ name: "Blessing 4", bit: 1 << 6, cost: { seasonalCandles: 30 }, emoji: blessing3 },
			{ name: "Hair accessory", bit: 1 << 7, emoji: hairAccessoryEmoji },
			{
				name: "Seasonal heart",
				bit: 1 << 8,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NestingHeart,
			},
		],
	},
});
