import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
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
	seasonId: SeasonId.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Prop 1",
				cosmetic: Cosmetic.NestingNookProp1,
				cost: { seasonalCandles: 16 },
				emoji: SmallPlaceableProp41,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.NestingNookBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.NestingNookBlessing2,
				cost: { seasonalCandles: 20 },
				emoji: blessing3,
			},
			{ name: "Prop 2", cosmetic: Cosmetic.NestingNookProp2, emoji: LargePlaceableProp41 },
			{
				name: "Prop 3",
				cosmetic: Cosmetic.NestingNookProp3,
				cost: { seasonalCandles: 26 },
				emoji: SmallPlaceableProp42,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.NestingNookBlessing3, emoji: blessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.NestingNookBlessing4,
				cost: { seasonalCandles: 30 },
				emoji: blessing3,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.NestingNookHairAccessory,
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.NestingNookSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.NestingHeart,
			},
		],
	},
});
