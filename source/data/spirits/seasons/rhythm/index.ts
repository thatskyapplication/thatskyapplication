import { Season } from "../../../../models/Season.js";
import { SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import AdmiringActor from "./admiring-actor.js";
import FestivalSpinDancer from "./festival-spin-dancer.js";
import RespectfulPianist from "./respectful-pianist.js";
import RhythmGuide from "./rhythm-guide.js";
import ThoughtfulDirector from "./thoughtful-director.js";
import TroupeGreeter from "./troupe-greeter.js";
import TroupeJuggler from "./troupe-juggler.js";

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
