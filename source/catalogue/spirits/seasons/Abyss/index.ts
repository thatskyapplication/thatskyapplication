import { Season } from "../../../../Structures/Season.js";
import { skyDate } from "../../../../Utility/dates.js";
import { SeasonName } from "../../../../Utility/seasons.js";
import AbyssGuide from "./AbyssGuide.js";
import AnxiousAngler from "./AnxiousAngler.js";
import BumblingBoatswain from "./BumblingBoatswain.js";
import CacklingCannoneer from "./CacklingCannoneer.js";
import CeasingCommodore from "./CeasingCommodore.js";

export default new Season({
	name: SeasonName.Abyss,
	start: skyDate(2_022, 1, 17),
	end: skyDate(2_022, 3, 27),
	guide: AbyssGuide,
	spirits: [AnxiousAngler, CeasingCommodore, BumblingBoatswain, CacklingCannoneer],
	seasonalCandlesRotation: null,
});
