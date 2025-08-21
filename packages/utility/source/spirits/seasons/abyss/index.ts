import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { SeasonId } from "../../../season.js";
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
	patchNotesURL: patchNotesRoute("p0160"),
});
