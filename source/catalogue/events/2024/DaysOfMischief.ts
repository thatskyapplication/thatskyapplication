import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

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
		},
		{
			name: "Mischief Cauldron",
			cosmetic: Cosmetic.MischiefCauldron,
			cost: { eventCurrency: 22 },
		},
		{
			name: "Mischief Spider Bun",
			cosmetic: Cosmetic.MischiefSpiderBun,
			cost: { eventCurrency: 36 },
		},
		{
			name: "Mischief Raven-Feathered Cloak",
			cosmetic: Cosmetic.MischiefRavenFeatheredCloak,
			cost: { money: 17.99 },
		},
		{
			name: "Mischief Withered Broom",
			cosmetic: Cosmetic.MischiefWitheredBroom,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1356",
});
