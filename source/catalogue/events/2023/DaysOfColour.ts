import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS, OUTFIT_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfColour2023,
	start: skyDate(2_023, 6, 1),
	end: skyDate(2_023, 6, 14),
	offer: [
		{ name: "Dark Rainbow Cape", bit: 1 << 0, cost: { eventCurrency: 104 }, emoji: CAPE_EMOJIS.Cape106 },
		{ name: "Dark Rainbow Pack", bit: 1 << 1, cost: { money: 9.99 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory26 },
		{ name: "Dark Rainbow Tunic", bit: 1 << 2, cost: { money: 14.99 }, emoji: OUTFIT_EMOJIS.Outfit47 },
	],
});
