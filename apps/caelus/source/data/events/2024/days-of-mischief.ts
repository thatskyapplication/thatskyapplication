import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2_024, 10, 21), end = skyDate(2_024, 11, 10);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfMischief2024,
	start: skyDate(2_024, 10, 21),
	end: skyDate(2_024, 11, 11),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Mischief Star Sticker",
			cosmetic: Cosmetic.MischiefStarSticker,
			cost: { eventTickets: 16 },
		},
		{
			name: "Mischief Cauldron",
			cosmetic: Cosmetic.MischiefCauldron,
			cost: { eventTickets: 36 },
		},
		{
			name: "Mischief Spider Bun",
			cosmetic: Cosmetic.MischiefSpiderBun,
			cost: { eventTickets: 22 },
		},
		{
			name: "Mischief Raven-Feathered Cloak",
			cosmetic: Cosmetic.MischiefRavenFeatheredCloak,
			cost: { money: 17.99 },
		},
		{
			name: "Mischief Withered Broom",
			cosmetic: Cosmetic.MischiefWitheredBroom,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0270", LINK_REDIRECTOR_URL)),
});
