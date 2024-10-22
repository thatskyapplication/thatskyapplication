import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import BereftVeteran from "./bereft-veteran.js";
import PleadingChild from "./pleading-child.js";
import RemembranceGuide from "./remembrance-guide.js";
import TiptoeingTeaBrewer from "./tiptoeing-tea-brewer.js";
import WoundedWarrior from "./wounded-warrior.js";

export default new Season({
	id: SeasonId.Remembrance,
	start: skyDate(2_023, 1, 16),
	end: skyDate(2_023, 4, 3),
	guide: RemembranceGuide,
	spirits: [BereftVeteran, PleadingChild, TiptoeingTeaBrewer, WoundedWarrior],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1096",
});
