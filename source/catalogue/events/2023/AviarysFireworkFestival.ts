import { Event } from "../../../Structures/Event.js";
import { CDN_BUCKET } from "../../../Utility/Constants.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { FACE_ACCESSORY_EMOJIS, HELD_PROPS_EMOJIS } from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_023, 11, 27), end = skyDate(2_023, 12, 11);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(
			new URL("events/2023/aviarys_firework_festival/event_currency.webp", CDN_BUCKET),
		),
	});
}

export default new Event({
	nameUnique: EventNameUnique.AviarysFireworkFestival2023,
	start: skyDate(2_023, 11, 27),
	end: skyDate(2_023, 12, 17),
	eventCurrency: {
		amount: eventCurrencyAmount,
		end: skyDate(2_023, 12, 11),
	},
	offer: [
		{
			name: "Face accessory",
			bit: 1 << 0,
			cost: { eventCurrency: 15 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory33,
		},
		{ name: "Prop", bit: 1 << 1, cost: { eventCurrency: 36 }, emoji: HELD_PROPS_EMOJIS.HeldProp39 },
	],
});
