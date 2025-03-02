import { URL } from "node:url";
import { SpiritEmote } from "@thatskyapplication/utility";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

const emote = SpiritEmote.CureForMeDance;

export default new Event({
	id: EventId.AURORAEncoreConcerts2023,
	start: skyDate(2_023, 8, 23),
	end: skyDate(2_023, 9, 4),
	offer: [
		{
			name: `${emote} 1`,
			cosmetic: Cosmetic.EmoteCureForMe1,
			cost: { eventTickets: 12 },
		},
		{
			name: `${emote} 2`,
			cosmetic: Cosmetic.EmoteCureForMe2,
			cost: { eventTickets: 33 },
		},
		{
			name: "Musical Voyage Sneakers",
			cosmetic: Cosmetic.MusicalVoyageSneakers,
			cost: { money: 6.99 },
		},
	],
	patchNotesURL: String(new URL("p0225", LINK_REDIRECTOR_URL)),
});
