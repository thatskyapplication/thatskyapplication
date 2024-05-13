import { URL } from "node:url";
import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { type ItemRaw, EventName } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_ACCESSORY_EMOJIS, HELD_PROPS_EMOJIS, SHOE_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	name: EventName.DaysOfFeast,
	start: skyDate(2_023, 12, 18),
	end: skyDate(2_024, 1, 7),
	url: String(new URL("daily_guides/events/days_of_feast/2023.webp", CDN_URL)),
	eventCurrencyPerDay: 5,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(Math.trunc(1), {
				name: "Prop",
				cost: { eventCurrency: 44 },
				emoji: HELD_PROPS_EMOJIS.HeldProp40,
			})
			.set(1 << 1, {
				name: "Hair accessory",
				cost: { eventCurrency: 19 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory34,
			})
			.set(1 << 2, {
				name: "Cosy Hermit Boots",
				cost: { money: 6.99 },
				emoji: SHOE_EMOJIS.Shoe13,
			})
			.set(1 << 3, {
				name: "Winter Quilted Cape",
				cost: { money: 14.99 },
				emoji: CAPE_EMOJIS.Cape120,
			}),
	},
});
