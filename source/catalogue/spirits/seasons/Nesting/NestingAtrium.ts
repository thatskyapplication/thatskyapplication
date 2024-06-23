import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import type { ItemRaw } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
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
		seasonal: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Prop 1", cost: { seasonalCandles: 16 }, emoji: SmallPlaceableProp40 })
			.set(1 << 1, { name: "Blessing 1", emoji: blessing3 })
			.set(1 << 2, { name: "Blessing 2", cost: { seasonalCandles: 20 }, emoji: blessing3 })
			.set(1 << 3, { name: "Prop 2", emoji: LargePlaceableProp39 })
			.set(1 << 4, { name: "Hair", cost: { seasonalCandles: 24 }, emoji: hairEmoji })
			.set(1 << 5, { name: "Blessing 3", emoji: blessing3 })
			.set(1 << 6, { name: "Blessing 4", cost: { seasonalCandles: 28 }, emoji: blessing3 })
			.set(1 << 7, { name: "Prop 3", emoji: LargePlaceableProp40 })
			.set(1 << 8, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.NestingHeart }),
	},
});
