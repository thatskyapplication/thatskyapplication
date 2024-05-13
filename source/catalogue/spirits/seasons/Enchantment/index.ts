import { Season } from "../../../../Structures/Season.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import CrabWalker from "./CrabWalker.js";
import EnchantmentGuide from "./EnchantmentGuide.js";
import IndifferentAlchemist from "./IndifferentAlchemist.js";
import NoddingMuralist from "./NoddingMuralist.js";
import PlayfightingHerbalist from "./PlayfightingHerbalist.js";
import ScarecrowFarmer from "./ScarecrowFarmer.js";
import SnoozingCarpenter from "./SnoozingCarpenter.js";

export default new Season({
	name: SeasonName.Enchantment,
	start: skyDate(2_020, 4, 20),
	end: skyDate(2_020, 6, 21),
	guide: EnchantmentGuide,
	spirits: [
		NoddingMuralist,
		IndifferentAlchemist,
		CrabWalker,
		ScarecrowFarmer,
		SnoozingCarpenter,
		PlayfightingHerbalist,
	],
	seasonalCandlesRotation: null,
});
