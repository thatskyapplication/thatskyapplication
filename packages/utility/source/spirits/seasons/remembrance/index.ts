import { skyDate } from "../../../dates.js";
import { Season } from "../../../models/season.js";
import { patchNotesRoute } from "../../../routes.js";
import { SeasonId } from "../../../season.js";
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
	patchNotesURL: patchNotesRoute("p0200"),
});
