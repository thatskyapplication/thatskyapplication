import { Season } from "../../../../models/Season.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import { MASK_EMOJIS, NECKLACE_EMOJIS } from "../../../../utility/emojis.js";
import GratitudeGuide from "./GratitudeGuide.js";
import GreetingShaman from "./GreetingShaman.js";
import LeapingDancer from "./LeapingDancer.js";
import ProvokingPerformer from "./ProvokingPerformer.js";
import SalutingProtector from "./SalutingProtector.js";
import SassyDrifter from "./SassyDrifter.js";
import StretchingGuru from "./StretchingGuru.js";

export default new Season({
	id: SeasonId.Gratitude,
	start: skyDate(2_019, 7, 19, 12),
	end: skyDate(2_019, 9, 2, 12),
	guide: GratitudeGuide,
	spirits: [
		SassyDrifter,
		StretchingGuru,
		ProvokingPerformer,
		LeapingDancer,
		SalutingProtector,
		GreetingShaman,
	],
	items: [
		{ name: "Pendant", cosmetic: Cosmetic.GratitudePendant, emoji: NECKLACE_EMOJIS.Necklace01 },
		{ name: "Ultimate mask", cosmetic: Cosmetic.GratitudeUltimateMask, emoji: MASK_EMOJIS.Mask10 },
	],
	seasonalCandlesRotation: null,
});
