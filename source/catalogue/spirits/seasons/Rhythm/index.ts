import { Season } from "../../../../Structures/Season.js";
import { SeasonId } from "../../../../Utility/catalogue.js";
import { skyDate } from "../../../../Utility/dates.js";
import AdmiringActor from "./AdmiringActor.js";
import FestivalSpinDancer from "./FestivalSpinDancer.js";
import RespectfulPianist from "./RespectfulPianist.js";
import RhythmGuide from "./RhythmGuide.js";
import ThoughtfulDirector from "./ThoughtfulDirector.js";
import TroupeGreeter from "./TroupeGreeter.js";
import TroupeJuggler from "./TroupeJuggler.js";

export default new Season({
	id: SeasonId.Rhythm,
	start: skyDate(2_020, 1, 24),
	end: skyDate(2_020, 4, 6),
	guide: RhythmGuide,
	spirits: [
		TroupeGreeter,
		FestivalSpinDancer,
		AdmiringActor,
		TroupeJuggler,
		RespectfulPianist,
		ThoughtfulDirector,
	],
	seasonalCandlesRotation: null,
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/601",
});
