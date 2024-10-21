import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import CrabWalker from "./crab-walker.js";
import EnchantmentGuide from "./enchantment-guide.js";
import IndifferentAlchemist from "./indifferent-alchemist.js";
import NoddingMuralist from "./nodding-muralist.js";
import PlayfightingHerbalist from "./playfighting-herbalist.js";
import ScarecrowFarmer from "./scarecrow-farmer.js";
import SnoozingCarpenter from "./snoozing-carpenter.js";

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
