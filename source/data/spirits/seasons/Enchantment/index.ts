import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import CrabWalker from "./CrabWalker.js";
import EnchantmentGuide from "./EnchantmentGuide.js";
import IndifferentAlchemist from "./IndifferentAlchemist.js";
import NoddingMuralist from "./NoddingMuralist.js";
import PlayfightingHerbalist from "./PlayfightingHerbalist.js";
import ScarecrowFarmer from "./ScarecrowFarmer.js";
import SnoozingCarpenter from "./SnoozingCarpenter.js";

export default new Season({
	id: SeasonId.Enchantment,
	start: skyDate(2_020, 4, 20),
	end: skyDate(2_020, 6, 22),
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
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/647",
});
