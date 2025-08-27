import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_024, 7, 29), end = skyDate(2_024, 8, 17);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 2 });
}

eventTicketAmount.push({ date: skyDate(2_024, 8, 18), amount: 5 });

export default new Event({
	id: EventId.TournamentOfTriumph2024,
	start: skyDate(2_024, 7, 29),
	end: skyDate(2_024, 8, 19),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				start: skyDate(2_024, 7, 29),
				end: skyDate(2_024, 8, 7),
				amount: 25,
			},
			{
				start: skyDate(2_024, 8, 8),
				end: skyDate(2_024, 8, 17),
				amount: 25,
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.TournamentCurls,
			cost: { eventTickets: 25 },
		},
		{
			cosmetic: Cosmetic.TournamentTorch,
			cost: { eventTickets: 37 },
		},
		{
			cosmetic: Cosmetic.TournamentGoldenGarland,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.TournamentTunic,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0260"),
});
