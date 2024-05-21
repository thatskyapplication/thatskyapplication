import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFortune2024,
	start: skyDate(2_024, 1, 29),
	end: skyDate(2_024, 2, 14),
	eventCurrencyInfographicURL: true,
	eventCurrencyPerDay: 5,
	offer: new Collection<number, ItemRaw>()
		.set(1 << 0, { name: "Mask", cost: { eventCurrency: 14 }, emoji: MASK_EMOJIS.Mask90 })
		.set(1 << 1, { name: "Prop", cost: { eventCurrency: 34 }, emoji: HELD_PROPS_EMOJIS.HeldProp41 })
		.set(1 << 2, { name: "Days of Fortune Dragon Vestment", cost: { money: 9.99 }, emoji: OUTFIT_EMOJIS.Outfit56 })
		.set(1 << 3, { name: "Days of Fortune Dragon Stole", cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape126 })
		.set(1 << 4, {
			name: "Days of Fortune Dragon Bangles",
			cost: { money: 1.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory35,
		}),
});
