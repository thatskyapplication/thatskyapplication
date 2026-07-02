import { Cosmetic, CosmeticPackName } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { CDN_URL, patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_023, 11, 27), end = skyDate(2_023, 12, 12);
	Temporal.ZonedDateTime.compare(start, end) < 0;
	start = start.add({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(
			new URL(`events/${EventId.AviarysFireworkFestival2023}/event_tickets.webp`, CDN_URL),
		),
	});
}

export default new Event({
	id: EventId.AviarysFireworkFestival2023,
	name: "aviarys-firework-festival",
	start: skyDate(2_023, 11, 27),
	end: skyDate(2_023, 12, 18),
	eventTickets: {
		amount: eventTicketAmount,
		end: skyDate(2_023, 12, 12),
	},
	offer: [
		{
			cosmetic: Cosmetic.FestivalEarrings,
			cost: { eventTickets: 15 },
		},
		{
			cosmetic: Cosmetic.FestivalSceptre,
			cost: { eventTickets: 36 },
		},
		{
			cosmetic: [Cosmetic.MothAppreciationCape, Cosmetic.MothAppreciationAntennae],
			cosmeticDisplay: Cosmetic.MothAppreciationCape,
			packName: CosmeticPackName.MothAppreciationPack,
			cost: { money: 9.99 },
		},
		{
			cosmetic: [Cosmetic.SparrowAppreciationCape, Cosmetic.SparrowAppreciationMask],
			cosmeticDisplay: Cosmetic.SparrowAppreciationCape,
			packName: CosmeticPackName.SparrowAppreciationPack,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0234"),
});
