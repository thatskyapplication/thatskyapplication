import { URL } from "node:url";
import { Cosmetic, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2_024, 10, 21), end = skyDate(2_024, 11, 10);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfMischief2024,
	start: skyDate(2_024, 10, 21),
	end: skyDate(2_024, 11, 11),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Mischief Star Sticker",
			cosmetic: Cosmetic.MischiefStarSticker,
			cost: { eventTickets: 16 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory40,
		},
		{
			name: "Mischief Cauldron",
			cosmetic: Cosmetic.MischiefCauldron,
			cost: { eventTickets: 36 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp76,
		},
		{
			name: "Mischief Spider Bun",
			cosmetic: Cosmetic.MischiefSpiderBun,
			cost: { eventTickets: 22 },
			emoji: HAIR_EMOJIS.Hair152,
		},
		{
			name: "Mischief Raven-Feathered Cloak",
			cosmetic: Cosmetic.MischiefRavenFeatheredCloak,
			cost: { money: 17.99 },
			emoji: CAPE_EMOJIS.Cape138,
		},
		{
			name: "Mischief Withered Broom",
			cosmetic: Cosmetic.MischiefWitheredBroom,
			cost: { money: 19.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp49,
		},
	],
	patchNotesURL: String(new URL("p0270", LINK_REDIRECTOR_URL)),
});
