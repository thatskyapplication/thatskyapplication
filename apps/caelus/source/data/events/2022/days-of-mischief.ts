import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

export default new Event({
	id: EventId.DaysOfMischief2022,
	start: skyDate(2_022, 10, 24),
	end: skyDate(2_022, 11, 14),
	offer: [
		{
			name: "Mischief Tufted Hair",
			cosmetic: Cosmetic.MischiefTuftedHair,
			cost: { candles: 44 },
		},
		{
			name: "Feline Familiar Prop",
			cosmetic: Cosmetic.FelineFamiliarProp,
			cost: { money: 9.99 },
		},
		{
			name: "Cat Costume Pack",
			cosmetic: [Cosmetic.CatCostumeMask, Cosmetic.CatCostumeCape],
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0190", LINK_REDIRECTOR_URL)),
});
