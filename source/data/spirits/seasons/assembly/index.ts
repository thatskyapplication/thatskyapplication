import { URL } from "node:url";
import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../../utility/constants.js";
import { skyDate } from "../../../../utility/dates.js";
import AssemblyGuide from "./assembly-guide.js";
import BaffledBotanist from "./baffled-botanist.js";
import ChucklingScout from "./chuckling-scout.js";
import DaydreamForester from "./daydream-forester.js";
import MarchingAdventurer from "./marching-adventurer.js";
import ScaredyCadet from "./scaredy-cadet.js";
import ScoldingStudent from "./scolding-student.js";

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
	patchNotesURL: String(new URL("p0132", LINK_REDIRECTOR_URL)),
});
