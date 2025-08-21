import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_024, 7, 12, 17), end = skyDate(2_024, 7, 27);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 4 });
}

export default new Event({
	id: EventId.SkyFest2024,
	start: skyDate(2_024, 7, 12, 17),
	end: skyDate(2_024, 7, 27),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.SkyFestStarJar,
			cost: { eventTickets: 15 },
		},
		{
			cosmetic: Cosmetic.SkyFest5thAnniversaryTShirt,
			cost: { eventTickets: 10 },
		},
		{
			cosmetic: Cosmetic.SkyFest5thAnniversaryHeadband,
			cost: { eventTickets: 3 },
		},
		{
			cosmetic: Cosmetic.SkyFestJenovaFan,
			cost: { eventTickets: 7 },
		},
		{
			cosmetic: Cosmetic.SkyFestOreoHeadband,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.SkyFestWireframeCape,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0260"),
});
