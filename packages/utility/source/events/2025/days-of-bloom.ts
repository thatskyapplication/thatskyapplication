import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 3, 24), end = skyDate(2_025, 4, 14);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfBloom2025,
	start: skyDate(2_025, 3, 24),
	end: skyDate(2_025, 4, 14),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 3, 24),
				end: skyDate(2_025, 4, 13),
			},
		],
	},
	offer: [
		{
			name: "Bloom Rose Jar",
			cosmetic: Cosmetic.BloomRoseJar,
			cost: { eventTickets: 16 },
		},
		{
			name: "Bloom Rose Braided Hair",
			cosmetic: Cosmetic.BloomRoseBraidedHair,
			cost: { eventTickets: 28 },
		},
		{
			name: "Bloom Rose Petal Mask",
			cosmetic: Cosmetic.BloomRosePetalMask,
			cost: { eventTickets: 36 },
		},
		{
			name: "Bloom Rose Embroidered Cape",
			cosmetic: Cosmetic.BloomRoseEmbroideredCape,
			cost: { money: 14.99 },
		},
		{
			name: "Dye blessing",
			cosmetic: Cosmetic.BloomRoseJar,
			cost: { eventTickets: 16 },
		},
	],
	patchNotesURL: String(new URL("p0285", LINK_REDIRECTOR_URL)),
});
