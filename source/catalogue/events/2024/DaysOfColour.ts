import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfColour2024,
	start: skyDate(2_024, 6, 24),
	end: skyDate(2_024, 7, 7),
	eventCurrencyPerDay: 5,
	offer: [
		{ name: "Colour Glam Cut", bit: 1 << 0, cost: { eventCurrency: 18 } },
		{ name: "Dark Rainbow Mask", bit: 1 << 1, cost: { eventCurrency: 32 } },
		{ name: "Dark Rainbow Loafers", bit: 1 << 2, cost: { money: 19.99 } },
	],
});
