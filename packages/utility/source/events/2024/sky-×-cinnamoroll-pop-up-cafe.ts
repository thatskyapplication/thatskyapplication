import { CDN_URL } from "../../cdn.js";
import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2024, 4, 27), end = skyDate(2024, 5, 18);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(
			new URL(`events/${EventId.SkyXCinnamorollPopUpCafe2024}/event_tickets.webp`, CDN_URL),
		),
	});
}

export default new Event({
	id: EventId.SkyXCinnamorollPopUpCafe2024,
	start: skyDate(2_024, 4, 27),
	end: skyDate(2_024, 5, 18),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			cosmetic: Cosmetic.CosyTeacupHeadband,
			cost: { eventTickets: 22 },
		},
		{
			cosmetic: Cosmetic.CosyCafeTable,
			cost: { eventTickets: 52 },
		},
		{
			cosmetic: [
				Cosmetic.CinnamorollPopUpCafeSwirledHair,
				Cosmetic.CinnamorollPopUpCafeCinnamarollEars,
			],
			cosmeticDisplay: Cosmetic.CinnamorollPopUpCafeCinnamarollEars,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.CinnamorollPopUpCafePlushie,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.CinnamorollPopUpCafeMiniCompanion,
			cost: { money: 6.99 },
		},
		{
			cosmetic: [Cosmetic.CinnamorollPopUpCafeBowtie, Cosmetic.CinnamorollPopUpCafeCloudCape],
			cosmeticDisplay: Cosmetic.CinnamorollPopUpCafeCloudCape,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: String(new URL("p0250", LINK_REDIRECTOR_URL)),
});
