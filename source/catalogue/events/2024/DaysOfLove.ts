import { URL } from "node:url";
import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfLove2024,
	start: skyDate(2_024, 2, 12),
	end: skyDate(2_024, 2, 25),
	url: String(new URL("daily_guides/events/days_of_love/2024.webp", CDN_URL)),
	eventCurrencyPerDay: 5,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, {
				name: "Prop",
				cost: { eventCurrency: 14 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp35,
			})
			.set(1 << 1, {
				name: "Hair accessory",
				cost: { eventCurrency: 27 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory37,
			})
			.set(1 << 2, { name: "Music sheet", cost: { eventCurrency: 7 }, emoji: MISCELLANEOUS_EMOJIS.MusicSheet })
			.set(1 << 3, { name: "Days of Love Meteor Mantle", cost: { money: 17.99 }, emoji: CAPE_EMOJIS.Cape127 }),
	},
});
