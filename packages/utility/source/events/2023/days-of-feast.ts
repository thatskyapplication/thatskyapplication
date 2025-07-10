import { CDN_URL } from "../../cdn.js";
import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_023, 12, 18), end = skyDate(2_024, 1, 8);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(
			new URL(`events/${EventId.DaysOfFeast2023}/event_tickets.webp`, CDN_URL),
		),
	});
}

export default new Event({
	id: EventId.DaysOfFeast2023,
	start: skyDate(2_023, 12, 18),
	end: skyDate(2_024, 1, 8),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.WinterFeastSnowboard,
			cost: { eventTickets: 44 },
		},
		{
			cosmetic: Cosmetic.WinterPineConeHairClip,
			cost: { eventTickets: 19 },
		},
		{
			cosmetic: Cosmetic.CourseCreationProp,
			cost: { candles: 150 },
		},
		{
			cosmetic: Cosmetic.CosyHermitBoots,
			cost: { money: 6.99 },
		},
		{
			cosmetic: Cosmetic.WinterQuiltedCape,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0235", LINK_REDIRECTOR_URL)),
});
