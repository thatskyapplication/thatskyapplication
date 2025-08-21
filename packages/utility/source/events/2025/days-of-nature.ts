import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 4, 28), end = skyDate(2_025, 5, 19);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfNature2025,
	start: skyDate(2_025, 4, 28),
	end: skyDate(2_025, 5, 19),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 4, 28),
				end: skyDate(2_025, 5, 18),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.OceanWavesOutfit,
			cost: { eventTickets: 49 },
		},
		{
			cosmetic: Cosmetic.OceanMantaHair,
			cost: { eventTickets: 37 },
		},
		{
			cosmetic: [Cosmetic.OceanSeaFoamCape, Cosmetic.OceanSeaFoamBoots],
			cosmeticDisplay: Cosmetic.OceanSeaFoamCape,
			cost: { money: 24.99 },
		},
		{
			cosmetic: Cosmetic.OceanWavesMask,
			cost: { money: 19.99 },
		},
	],
	offerInfographicURL: true,
	patchNotesURL: patchNotesRoute("p0290"),
});
