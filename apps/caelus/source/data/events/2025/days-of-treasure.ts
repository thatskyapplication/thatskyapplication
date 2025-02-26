import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2_025, 3, 3), end = skyDate(2_025, 3, 17);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfTreasure2025,
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
			name: "Treasure Cavalier Boots",
			cosmetic: Cosmetic.TreasureCavalierBoots,
			cost: { eventTickets: 30 },
		},
		{
			name: "Treasure Shovel",
			cosmetic: Cosmetic.TreasureShovel,
			cost: { eventTickets: 30 },
		},
		{
			name: "Treasure Seeker's Bounty",
			cosmetic: [
				Cosmetic.TreasureSeekersEyePatch,
				Cosmetic.TreasureSeekersOutfit,
				Cosmetic.TreasureSeekersBlackDye,
				Cosmetic.TreasureSeekersWhiteDye,
			],
			cost: { money: 14.99 },
		},
		{
			name: "Dye blessing",
			cosmetic: [Cosmetic.TreasureDye],
			cost: { eventTickets: 10 },
		},
	],
	patchNotesURL: String(new URL("p0285", LINK_REDIRECTOR_URL)),
});
