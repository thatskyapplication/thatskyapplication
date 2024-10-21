import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility2/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 10, 21), end = skyDate(2_024, 11, 10);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfMischief2024,
	start: skyDate(2_024, 10, 21),
	end: skyDate(2_024, 11, 11),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Mischief Star Sticker",
			cosmetic: Cosmetic.MischiefStarSticker,
			cost: { eventCurrency: 16 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory40,
		},
		{
			name: "Mischief Cauldron",
			cosmetic: Cosmetic.MischiefCauldron,
			cost: { eventCurrency: 36 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp76,
		},
		{
			name: "Mischief Spider Bun",
			cosmetic: Cosmetic.MischiefSpiderBun,
			cost: { eventCurrency: 22 },
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
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1356",
});
