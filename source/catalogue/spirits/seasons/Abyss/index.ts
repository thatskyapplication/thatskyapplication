import { Season } from "../../../../Structures/Season.js";
import { SeasonId } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import AbyssGuide from "./AbyssGuide.js";
import AnxiousAngler from "./AnxiousAngler.js";
import BumblingBoatswain from "./BumblingBoatswain.js";
import CacklingCannoneer from "./CacklingCannoneer.js";
import CeasingCommodore from "./CeasingCommodore.js";

export default new Season({
	id: SeasonId.Abyss,
	start: skyDate(2_022, 1, 17),
	end: skyDate(2_022, 3, 28),
	guide: AbyssGuide,
	spirits: [AnxiousAngler, CeasingCommodore, BumblingBoatswain, CacklingCannoneer],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/866",
});
