import { Season } from "../../../../Structures/Season.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import AssemblyGuide from "./AssemblyGuide.js";
import BaffledBotanist from "./BaffledBotanist.js";
import ChucklingScout from "./ChucklingScout.js";
import DaydreamForester from "./DaydreamForester.js";
import MarchingAdventurer from "./MarchingAdventurer.js";
import ScaredyCadet from "./ScaredyCadet.js";
import ScoldingStudent from "./ScoldingStudent.js";

export default new Season({
	name: SeasonName.Assembly,
	start: skyDate(2_021, 4, 5),
	end: skyDate(2_021, 6, 13),
	guide: AssemblyGuide,
	spirits: [BaffledBotanist, ScoldingStudent, ScaredyCadet, MarchingAdventurer, ChucklingScout, DaydreamForester],
	seasonalCandlesRotation: null,
});
