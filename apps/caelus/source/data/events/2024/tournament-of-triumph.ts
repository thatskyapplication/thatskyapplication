import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

const eventTicketAmount = [];

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
			name: "Tournament Curls",
			cosmetic: Cosmetic.TournamentCurls,
			cost: { eventTickets: 25 },
		},
		{
			name: "Tournament Torch",
			cosmetic: Cosmetic.TournamentTorch,
			cost: { eventTickets: 37 },
		},
		{
			name: "Tournament Golden Garland",
			cosmetic: Cosmetic.TournamentGoldenGarland,
			cost: { money: 4.99 },
		},
		{
			name: "Tournament Tunic",
			cosmetic: Cosmetic.TournamentTunic,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: String(new URL("p0260", LINK_REDIRECTOR_URL)),
});
