import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfSummerLights2021,
	start: skyDate(2_021, 9, 20),
	end: skyDate(2_021, 10, 4),
	offer: [
		{
			name: "Days of Summer Lights Accessory",
			cosmetic: Cosmetic.SummerLightsAccessory,
			cost: { money: 2.99 },
		},
	],
	patchNotesURL: String(new URL("p0145", LINK_REDIRECTOR_URL)),
});
