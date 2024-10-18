import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS, HELD_PROPS_EMOJIS } from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_023, 11, 27), end = skyDate(2_023, 12, 12);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(
			new URL("events/2023/aviarys_firework_festival/event_currency.webp", CDN_URL),
		),
	});
}

export default new Event({
	id: EventId.AviarysFireworkFestival2023,
	start: skyDate(2_023, 11, 27),
	end: skyDate(2_023, 12, 18),
	eventCurrency: {
		amount: eventCurrencyAmount,
		end: skyDate(2_023, 12, 12),
	},
	offer: [
		{
			name: "Festival Earrings",
			cosmetic: Cosmetic.FestivalEarrings,
			cost: { eventCurrency: 15 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory33,
		},
		{
			name: "Festival Sceptre",
			cosmetic: Cosmetic.FestivalSceptre,
			cost: { eventCurrency: 36 },
			emoji: HELD_PROPS_EMOJIS.HeldProp39,
		},
		{
			name: "Moth Appreciation Pack",
			cosmetic: [Cosmetic.MothAppreciationCape, Cosmetic.MothAppreciationAntennae],
			cost: { money: 9.99 },
			emoji: CAPE_EMOJIS.Cape119,
		},
		{
			name: "Sparrow Appreciation Pack",
			cosmetic: [Cosmetic.SparrowAppreciationCape, Cosmetic.SparrowAppreciationMask],
			cost: { money: 9.99 },
			emoji: CAPE_EMOJIS.Cape118,
		},
	],
});
