import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { MISCELLANEOUS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfNature2024,
	start: skyDate(2_024, 5, 27),
	end: skyDate(2_024, 6, 16),
	eventCurrencyPerDay: 4,
	offer: new Collection<number, ItemRaw>()
		// TODO: Add emoji.
		.set(1 << 0, { name: "Ocean Mask", cost: { eventCurrency: 16 }, emoji: MISCELLANEOUS_EMOJIS.EventCurrency })
		// TODO: Add emoji.
		.set(1 << 1, { name: "Ocean Blue Scarf", cost: { eventCurrency: 40 }, emoji: MISCELLANEOUS_EMOJIS.EventCurrency })
		// TODO: Add emoji.
		.set(1 << 2, { name: "Nature Wave Pack", cost: { money: 19.99 }, emoji: MISCELLANEOUS_EMOJIS.EventCurrency }),
});
