import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.KizunaAI2022,
	start: skyDate(2_022, 2, 25),
	end: skyDate(2_022, 3, 11),
	offer: [
		{
			cosmetic: [Cosmetic.KizunaAIHair, Cosmetic.KizunaAIBow, Cosmetic.KizunaAICape],
			cosmeticDisplay: Cosmetic.KizunaAIHair,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0165"),
});
