import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS, OUTFIT_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfColour2023,
	start: skyDate(2_023, 6, 1),
	end: skyDate(2_023, 6, 14),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, { name: "Dark Rainbow Cape", cost: { eventCurrency: 104 }, emoji: CAPE_EMOJIS.Cape106 })
			.set(1 << 1, { name: "Dark Rainbow Pack", cost: { money: 9.99 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory26 })
			.set(1 << 2, { name: "Dark Rainbow Tunic", cost: { money: 14.99 }, emoji: OUTFIT_EMOJIS.Outfit46 }),
	},
});
