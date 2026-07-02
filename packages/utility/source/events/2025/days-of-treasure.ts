import { Cosmetic, CosmeticPackName } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 3, 3), end = skyDate(2_025, 3, 17);
	Temporal.ZonedDateTime.compare(start, end) < 0;
	start = start.add({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		// https://x.com/thatskygame/status/1897100136662360408
		amount: 6,
	});
}

export default new Event({
	id: EventId.DaysOfTreasure2025,
	name: "days-of-treasure",
	start: skyDate(2_025, 3, 3),
	end: skyDate(2_025, 3, 17),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 3, 3),
				end: skyDate(2_025, 3, 16),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.TreasureCavalierBoots,
			cost: { eventTickets: 30 },
		},
		{
			cosmetic: Cosmetic.TreasureShovel,
			cost: { eventTickets: 30 },
		},
		{
			cosmetic: [
				Cosmetic.TreasureSeekersEyepatch,
				Cosmetic.TreasureSeekersOutfit,
				Cosmetic.TreasureSeekersBlackDye,
				Cosmetic.TreasureSeekersWhiteDye,
			],
			cosmeticDisplay: Cosmetic.TreasureSeekersOutfit,
			packName: CosmeticPackName.TreasureSeekerPack,
			cost: { money: 14.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0285"),
});
