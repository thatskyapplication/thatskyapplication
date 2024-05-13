import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
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
	seasonalCandlesRotation: null,
});
