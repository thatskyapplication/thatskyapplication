import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

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
			cosmetic: Cosmetic.MischiefStarSticker,
			cost: { eventTickets: 16 },
		},
		{
			cosmetic: Cosmetic.MischiefCauldron,
			cost: { eventTickets: 36 },
		},
		{
			cosmetic: Cosmetic.MischiefSpiderBun,
			cost: { eventTickets: 22 },
		},
		{
			cosmetic: Cosmetic.MischiefRavenFeatheredCloak,
			cost: { money: 17.99 },
		},
		{
			cosmetic: Cosmetic.MischiefWitheredBroom,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0270"),
});
