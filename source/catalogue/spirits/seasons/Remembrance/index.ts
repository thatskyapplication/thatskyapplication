import { Season } from "../../../../Structures/Season.js";
import { SeasonId } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import BereftVeteran from "./BereftVeteran.js";
import PleadingChild from "./PleadingChild.js";
import RemembranceGuide from "./RemembranceGuide.js";
import TiptoeingTeaBrewer from "./TiptoeingTeaBrewer.js";
import WoundedWarrior from "./WoundedWarrior.js";

export default new Season({
	id: SeasonId.Remembrance,
	start: skyDate(2_023, 1, 16),
	end: skyDate(2_023, 4, 3),
	guide: RemembranceGuide,
	spirits: [BereftVeteran, PleadingChild, TiptoeingTeaBrewer, WoundedWarrior],
	seasonalCandlesRotation: null,
});
