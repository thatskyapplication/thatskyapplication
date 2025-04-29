import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
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
			name: "Ocean Waves Outfit",
			cosmetic: Cosmetic.OceanWavesOutfit,
			cost: { eventTickets: 49 },
		},
		{
			name: "Ocean Manta Hair",
			cosmetic: Cosmetic.OceanMantaHair,
			cost: { eventTickets: 37 },
		},
		{
			name: "Ocean Sea Foam Set",
			cosmetic: [Cosmetic.OceanSeaFoamCape, Cosmetic.OceanSeaFoamBoots],
			cosmeticDisplay: Cosmetic.OceanSeaFoamCape,
			cost: { money: 24.99 },
		},
		{
			name: "Ocean Waves Mask",
			cosmetic: Cosmetic.OceanWavesMask,
			cost: { money: 19.99 },
		},
	],
	offerInfographicURL: true,
	patchNotesURL: String(new URL("p0290", LINK_REDIRECTOR_URL)),
});
