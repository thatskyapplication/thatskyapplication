import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
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
	items: [
		{ name: "Little Prince Scarf Cape", bit: 1 << 0, cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape63 },
		{ name: "Little Prince Asteroid Jacket", bit: 1 << 1, cost: { money: 24.99 }, emoji: CAPE_EMOJIS.Cape64 },
		{
			name: "Little Prince Fox",
			bit: 1 << 2,
			cost: { money: 9.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp06,
		},
	],
	seasonalCandlesRotation: null,
});
