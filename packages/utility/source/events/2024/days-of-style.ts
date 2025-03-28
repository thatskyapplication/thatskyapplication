import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_024, 9, 30), end = skyDate(2_024, 10, 14);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfStyle2024,
	start: skyDate(2_024, 9, 30),
	end: skyDate(2_024, 10, 14),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Style Darkness Fascinator",
			cosmetic: Cosmetic.StyleDarknessFascinator,
			cost: { eventTickets: 15 },
		},
		{
			name: "Style Dazzling Dress",
			cosmetic: Cosmetic.StyleDazzlingDress,
			cost: { eventTickets: 34 },
		},
		{
			name: "Style Dapper Trio",
			cosmetic: [
				Cosmetic.StyleDapperSuit,
				Cosmetic.StyleDapperMonocle,
				Cosmetic.StyleDapperNecktie,
			],
			cosmeticDisplay: Cosmetic.StyleDapperSuit,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0265", LINK_REDIRECTOR_URL)),
});
