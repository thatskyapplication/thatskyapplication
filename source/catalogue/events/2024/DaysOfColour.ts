import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfColour2024,
	start: skyDate(2_024, 6, 24),
	end: skyDate(2_024, 7, 7),
	eventCurrencyPerDay: 5,
	offer: new Collection<number, ItemRaw>()
		// @ts-expect-error Emoji has not yet been created.
		.set(1 << 0, { name: "Colour Glam Cut", cost: { eventCurrency: 18 }, emoji: null })
		// @ts-expect-error Emoji has not yet been created.
		.set(1 << 1, { name: "Dark Rainbow Mask", cost: { eventCurrency: 32 }, emoji: null })
		// @ts-expect-error Emoji has not yet been created.
		.set(1 << 2, { name: "Dark Rainbow Loafers", cost: { money: 19.99 }, emoji: null }),
});
