import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS, OUTFIT_EMOJIS } from "../../../utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 9, 30), end = skyDate(2_024, 10, 14);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfStyle2024,
	start: skyDate(2_024, 9, 30),
	end: skyDate(2_024, 10, 14),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Style Darkness Fascinator",
			cosmetic: Cosmetic.StyleDarknessFascinator,
			cost: { eventCurrency: 15 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory46,
		},
		{
			name: "Style Dazzling Dress",
			cosmetic: Cosmetic.StyleDazzlingDress,
			cost: { eventCurrency: 34 },
			emoji: OUTFIT_EMOJIS.Outfit67,
		},
		{
			name: "Style Dapper Trio",
			cosmetic: [
				Cosmetic.StyleDapperSuit,
				Cosmetic.StyleDapperMonocle,
				Cosmetic.StyleDapperNecktie,
			],
			cost: { money: 14.99 },
			emoji: OUTFIT_EMOJIS.Outfit68,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1343",
});
