/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import type { FriendshipTreeItem } from "../../../../Utility/catalogue.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import {
	CAPE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const capeEmoji = CAPE_EMOJIS.Cape129;
const { LargePlaceableProp37, LargePlaceableProp38 } = LARGE_PLACEABLE_PROPS_EMOJIS;
const { SmallPlaceableProp39 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	name: SpiritName.NestingLoft,
	season: SeasonName.Nesting,
	offer: {
		hasInfographic: false,
		seasonal: new Collection<number, FriendshipTreeItem>()
			.set(1 << 0, { name: "Blessing 1", cost: { seasonalCandles: 12 }, emoji: blessing3 })
			.set(1 << 1, { name: "Prop 1", cost: null, emoji: LargePlaceableProp37 })
			.set(1 << 2, { name: "Prop 2", cost: { seasonalCandles: 20 }, emoji: LargePlaceableProp38 })
			.set(1 << 3, { name: "Blessing 2", cost: null, emoji: blessing3 })
			.set(1 << 4, { name: "Blessing 3", cost: { seasonalCandles: 28 }, emoji: blessing3 })
			.set(1 << 5, { name: "Cape", cost: null, emoji: capeEmoji })
			.set(1 << 6, { name: "Prop 3", cost: { seasonalCandles: 36 }, emoji: SmallPlaceableProp39 })
			.set(1 << 7, { name: "Blessing 4", cost: null, emoji: blessing3 })
			.set(1 << 8, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.NestingHeart }),
	},
});
