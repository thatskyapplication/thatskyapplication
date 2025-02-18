import { SeasonId, skyDate } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import BelongingGuide from "./belonging-guide.js";
import BoogieKid from "./boogie-kid.js";
import ConfettiCousin from "./confetti-cousin.js";
import HairtousleTeen from "./hairtousle-teen.js";
import PleafulParent from "./pleaful-parent.js";
import SparklerParent from "./sparkler-parent.js";
import WiseGrandparent from "./wise-grandparent.js";

export default new Season({
	id: SeasonId.Belonging,
	start: skyDate(2_019, 11, 18),
	end: skyDate(2_020, 1, 13),
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
	patchNotesURL: "https://sky-children-of-the-light.fandom.com/wiki/Update:Live_0.7.0",
});
