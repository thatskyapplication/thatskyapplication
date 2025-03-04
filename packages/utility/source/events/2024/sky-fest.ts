import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
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
			name: "SkyFest Star Jar",
			cosmetic: Cosmetic.SkyFestStarJar,
			cost: { eventTickets: 15 },
		},
		{
			name: "SkyFest 5th Anniversary T-shirt",
			cosmetic: Cosmetic.SkyFest5thAnniversaryTShirt,
			cost: { eventTickets: 10 },
		},
		{
			name: "SkyFest 5th Anniversary Headband",
			cosmetic: Cosmetic.SkyFest5thAnniversaryHeadband,
			cost: { eventTickets: 3 },
		},
		{
			name: "SkyFest Jenova Fan",
			cosmetic: Cosmetic.SkyFestJenovaFan,
			cost: { eventTickets: 7 },
		},
		{
			name: "SkyFest Oreo Headband",
			cosmetic: Cosmetic.SkyFestOreoHeadband,
			cost: { money: 4.99 },
		},
		{
			name: "SkyFest Wireframe Cape",
			cosmetic: Cosmetic.SkyFestWireframeCape,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0260", LINK_REDIRECTOR_URL)),
});
