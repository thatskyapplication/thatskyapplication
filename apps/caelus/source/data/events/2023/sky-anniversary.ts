import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.SkyAnniversary2023,
	start: skyDate(2_023, 7, 17),
	end: skyDate(2_023, 7, 31),
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory4,
			cost: { eventTickets: 8 },
		},
		{
			name: "Anniversary Sonorous Seashell",
			cosmetic: Cosmetic.AnniversarySonorousSeashell,
			cost: { eventTickets: 46 },
		},
		{
			name: "Anniversary Party Lights",
			cosmetic: Cosmetic.AnniversaryPartyLights,
			cost: { eventTickets: 46 },
		},
		{
			name: "Anniversary Plush",
			cosmetic: Cosmetic.AnniversaryPlush,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: String(new URL("p0220", LINK_REDIRECTOR_URL)),
});
