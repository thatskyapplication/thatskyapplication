import { SeasonId } from "@thatskyapplication/utility";
import { Season } from "../../../../models/Season.js";
import { Cosmetic } from "../../../../utility/catalogue.js";
import { skyDate } from "../../../../utility/dates.js";
import { MASK_EMOJIS, NECKLACE_EMOJIS } from "../../../../utility/emojis.js";
import GratitudeGuide from "./gratitude-guide.js";
import GreetingShaman from "./greeting-shaman.js";
import LeapingDancer from "./leaping-dancer.js";
import ProvokingPerformer from "./provoking-performer.js";
import SalutingProtector from "./saluting-protector.js";
import SassyDrifter from "./sassy-drifter.js";
import StretchingGuru from "./stretching-guru.js";

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
