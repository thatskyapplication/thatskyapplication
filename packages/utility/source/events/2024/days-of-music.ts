import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_024, 11, 25), end = skyDate(2_024, 12, 12);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 4,
	});
}

export default new Event({
	id: EventId.DaysOfMusic2024,
	start: skyDate(2_024, 11, 25),
	end: skyDate(2_024, 12, 12),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_024, 11, 25),
				end: skyDate(2_024, 12, 11),
			},
		],
	},
	offer: [
		{
			name: "Marching Band Cape",
			cosmetic: Cosmetic.MarchingBandCape,
			cost: { eventTickets: 50 },
		},
		{
			name: "Music Marching Uniform",
			cosmetic: Cosmetic.MusicMarchingUniform,
			cost: { money: 9.99 },
		},
		{
			name: "Jam Station",
			cosmetic: Cosmetic.JamStation,
			cost: { candles: 250 },
		},
		{
			name: "Fledgling Upright Piano",
			cosmetic: Cosmetic.FledglingUprightPiano,
			cost: { money: 4.99 },
		},
	],
	patchNotesURL: String(new URL("p0275", LINK_REDIRECTOR_URL)),
});
