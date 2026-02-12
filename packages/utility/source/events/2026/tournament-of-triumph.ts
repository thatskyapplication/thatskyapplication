import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 1, 30), end = skyDate(2026, 2, 10);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

// Tournament ended, so no event ticket light is given for choosing a team.
for (
	let start = skyDate(2026, 2, 10), end = skyDate(2026, 2, 13);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 3,
	});
}

export default new Event({
	id: EventId.TournamentOfTriumph2026,
	start: skyDate(2026, 1, 30),
	end: skyDate(2026, 2, 13),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 1, 30),
				end: skyDate(2026, 2, 12),
			},
			// Compensation due to an issue where no event ticket light was given after the tournament ended.
			// It was made available in the box that provides free blessings.
			{
				amount: 10,
				start: skyDate(2026, 1, 11),
				end: skyDate(2026, 2, 12),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.TournamentOfTriumphHeldProp,
			cost: { eventTickets: 48 },
		},
		{
			translation: CosmeticCommon.Hair,
			cosmetic: Cosmetic.TournamentOfTriumphHair,
			cost: { eventTickets: 12 },
		},
		{
			cosmetic: [Cosmetic.TournamentSleekSkatingOutfit, Cosmetic.TournamentSleekSkatingShoes],
			cost: { money: 14.99 },
			cosmeticDisplay: Cosmetic.TournamentSleekSkatingOutfit,
		},
		{
			cosmetic: Cosmetic.TournamentCrystallineCape,
			cost: { money: 19.99 },
		},
		{
			cosmetic: Cosmetic.TournamentTeamPrairieCape,
			cost: { candles: 49 },
		},
		{
			cosmetic: Cosmetic.TournamentTeamForestCape,
			cost: { candles: 49 },
		},
		{
			cosmetic: Cosmetic.TournamentTeamValleyCape,
			cost: { candles: 49 },
		},
		{
			cosmetic: Cosmetic.TournamentTeamWastelandCape,
			cost: { candles: 49 },
		},
		{
			cosmetic: Cosmetic.TournamentPodium,
			cost: { candles: 35 },
		},
		{
			cosmetic: Cosmetic.TournamentPrairieFlag,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.TournamentForestFlag,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.TournamentValleyFlag,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.TournamentWastelandFlag,
			cost: { candles: 15 },
		},
	],
});
