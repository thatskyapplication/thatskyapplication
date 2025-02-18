import { URL } from "node:url";
import { Cosmetic, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { HAIR_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.KizunaAI2022,
	start: skyDate(2_022, 2, 25),
	end: skyDate(2_022, 3, 11),
	offer: [
		{
			name: "Kizuna AI Pack",
			cosmetic: [Cosmetic.KizunaAIHair, Cosmetic.KizunaAIBow, Cosmetic.KizunaAICape],
			cost: { money: 19.99 },
			emoji: HAIR_EMOJIS.Hair102,
		},
	],
	patchNotesURL: String(new URL("p0165", LINK_REDIRECTOR_URL)),
});
