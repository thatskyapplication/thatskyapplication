import { Collection } from "discord.js";
import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import type { FriendshipTreeItemRaw } from "../../../../Utility/catalogue.js";
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
		seasonal: new Collection<number, FriendshipTreeItemRaw>()
			.set(1 << 0, { name: "Prop 1", cost: { seasonalCandles: 16 }, emoji: SmallPlaceableProp41 })
			.set(1 << 1, { name: "Blessing 1", cost: null, emoji: blessing3 })
			.set(1 << 2, { name: "Blessing 2", cost: { seasonalCandles: 20 }, emoji: blessing3 })
			.set(1 << 3, { name: "Prop 2", cost: null, emoji: LargePlaceableProp41 })
			.set(1 << 4, { name: "Prop 3", cost: { seasonalCandles: 26 }, emoji: SmallPlaceableProp42 })
			.set(1 << 5, { name: "Blessing 3", cost: null, emoji: blessing3 })
			.set(1 << 6, { name: "Blessing 4", cost: { seasonalCandles: 30 }, emoji: blessing3 })
			.set(1 << 7, { name: "Hair accessory", cost: null, emoji: hairAccessoryEmoji })
			.set(1 << 8, { name: "Seasonal heart", cost: { seasonalCandles: 3 }, emoji: SEASON_EMOJIS.NestingHeart }),
	},
});
