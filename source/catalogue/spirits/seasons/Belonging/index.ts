import { Season } from "../../../../Structures/Season.js";
import { SeasonName } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import BelongingGuide from "./BelongingGuide.js";
import BoogieKid from "./BoogieKid.js";
import ConfettiCousin from "./ConfettiCousin.js";
import HairtousleTeen from "./HairtousleTeen.js";
import PleafulParent from "./PleafulParent.js";
import SparklerParent from "./SparklerParent.js";
import WiseGrandparent from "./WiseGrandparent.js";

export default new Season({
	name: SeasonName.Belonging,
	start: skyDate(2_019, 11, 18),
	end: skyDate(2_020, 1, 12),
	guide: BelongingGuide,
	spirits: [
		BoogieKid,
		ConfettiCousin,
		HairtousleTeen,
		SparklerParent,
		PleafulParent,
		WiseGrandparent,
	],
	seasonalCandlesRotation: null,
});
