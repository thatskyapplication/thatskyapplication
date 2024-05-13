import { Season } from "../../../Structures/Season.js";
import { skyDate } from "../../../Utility/dates.js";
import { SeasonName } from "../../../Utility/seasons.js";
import GratitudeGuide from "./GratitudeGuide.js";
import GreetingShaman from "./GreetingShaman.js";
import LeapingDancer from "./LeapingDancer.js";
import ProvokingPerformer from "./ProvokingPerformer.js";
import SalutingProtector from "./SalutingProtector.js";
import SassyDrifter from "./SassyDrifter.js";
import StretchingGuru from "./StretchingGuru.js";

export default new Season({
	name: SeasonName.Gratitude,
	start: skyDate(2_019, 7, 19),
	end: skyDate(2_019, 9, 2),
	guide: GratitudeGuide,
	spirits: [SassyDrifter, StretchingGuru, ProvokingPerformer, LeapingDancer, SalutingProtector, GreetingShaman],
	seasonalCandlesRotation: null,
});
