import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { SeasonId } from "../../../season.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import AbyssGuide from "./abyss-guide.js";
import AnxiousAngler from "./anxious-angler.js";
import BumblingBoatswain from "./bumbling-boatswain.js";
import CacklingCannoneer from "./cackling-cannoneer.js";
import CeasingCommodore from "./ceasing-commodore.js";

export default new Season({
	id: SeasonId.Abyss,
	start: skyDate(2_022, 1, 17),
	end: skyDate(2_022, 3, 28),
	guide: AbyssGuide,
	spirits: [AnxiousAngler, CeasingCommodore, BumblingBoatswain, CacklingCannoneer],
	seasonalCandlesRotation: null,
	patchNotesURL: String(new URL("p0160", LINK_REDIRECTOR_URL)),
});
