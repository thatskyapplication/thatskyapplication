import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	nameUnique: EventNameUnique.SkyFest2024,
	start: skyDate(2_024, 7, 12, 17),
	end: skyDate(2_024, 7, 26),
	eventCurrencyPerDay: 4,
	offer: [
		{
			name: "SkyFest 5th Anniversary Headband",
			bit: 1 << 0,
			cost: { eventCurrency: 4 },
		},
		{
			name: "SkyFest Jenova Fan",
			bit: 1 << 1,
			cost: { eventCurrency: 8 },
		},
		{
			name: "SkyFest 5th Anniversary T-shirt",
			bit: 1 << 2,
			cost: { eventCurrency: 12 },
		},
		{
			name: "SkyFest Star Jar",
			bit: 1 << 3,
			cost: { eventCurrency: 16 },
		},
		{
			name: "SkyFest Oreo Headband",
			bit: 1 << 4,
			cost: { money: 4.99 },
		},
		{
			name: "SkyFest Wireframe Cape",
			bit: 1 << 5,
			cost: { money: 19.99 },
		},
	],
});
