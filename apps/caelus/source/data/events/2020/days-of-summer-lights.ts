import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { HELD_PROPS_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfSummerLights2020,
	start: skyDate(2_020, 9, 8),
	end: skyDate(2_020, 9, 21),
	offer: [
		{
			name: "Days of Summer Lights Pack",
			cosmetic: Cosmetic.DaysOfSummerLightsLantern,
			cost: { money: 19.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp18,
		},
	],
	patchNotesURL: String(new URL("p0105", LINK_REDIRECTOR_URL)),
});
