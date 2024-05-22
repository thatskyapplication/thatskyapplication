import { Collection } from "discord.js";
import { Season } from "../../../../Structures/Season.js";
import { SeasonName, type ItemRaw } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import { CAPE_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../../Utility/emojis.js";
import BeckoningRuler from "./BeckoningRuler.js";
import GloatingNarcissist from "./GloatingNarcissist.js";
import SlouchingSoldier from "./SlouchingSoldier.js";
import SneezingGeographer from "./SneezingGeographer.js";
import StarCollector from "./StarCollector.js";
import StretchingLamplighter from "./StretchingLamplighter.js";
import TheRose from "./TheRose.js";

export default new Season({
	name: SeasonName.LittlePrince,
	start: skyDate(2_021, 7, 6),
	end: skyDate(2_022, 9, 19),
	guide: TheRose,
	spirits: [
		BeckoningRuler,
		GloatingNarcissist,
		StretchingLamplighter,
		SlouchingSoldier,
		SneezingGeographer,
		StarCollector,
	],
	inAppPurchases: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Little Prince Scarf Cape", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape63 })
		.set(1 << 1, { name: "Little Prince Asteroid Jacket", cost: { money: 24.99 }, emoji: CAPE_EMOJIS.Cape64 })
		.set(1 << 2, {
			name: "Little Prince Fox",
			cost: { money: 9.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp06,
		}),
	seasonalCandlesRotation: null,
});
