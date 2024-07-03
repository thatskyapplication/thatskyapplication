import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	nameUnique: EventNameUnique.TournamentOfTriumph2024,
	start: skyDate(2_024, 7, 29),
	end: skyDate(2_024, 8, 18),
	eventCurrencyPerDay: 2,
	offer: [
		{
			name: "Tournament Curls",
			bit: 1 << 0,
			cost: { eventCurrency: 25 },
		},
		{
			name: "Tournament Torch",
			bit: 1 << 1,
			cost: { eventCurrency: 37 },
		},
		{
			name: "Tournament Golden Garland",
			bit: 1 << 2,
			cost: { money: 4.99 },
		},
		{
			name: "Tournament Tunic",
			bit: 1 << 3,
			cost: { money: 9.99 },
		},
	],
});
