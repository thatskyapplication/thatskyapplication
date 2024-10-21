import { Season } from "../../../../Structures/Season.js";
import { SeasonId } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import AssemblyGuide from "./AssemblyGuide.js";
import BaffledBotanist from "./BaffledBotanist.js";
import ChucklingScout from "./ChucklingScout.js";
import DaydreamForester from "./DaydreamForester.js";
import MarchingAdventurer from "./MarchingAdventurer.js";
import ScaredyCadet from "./ScaredyCadet.js";
import ScoldingStudent from "./ScoldingStudent.js";

export default new Season({
	id: SeasonId.Assembly,
	start: skyDate(2_021, 4, 5),
	end: skyDate(2_021, 6, 14),
	guide: AssemblyGuide,
	spirits: [
		BaffledBotanist,
		ScoldingStudent,
		ScaredyCadet,
		MarchingAdventurer,
		ChucklingScout,
		DaydreamForester,
	],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/776",
});
