import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CDN_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import { CAPE_EMOJIS, FACE_ACCESSORY_EMOJIS, HELD_PROPS_EMOJIS } from "../../../utility/emojis.js";

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
	patchNotesURL: String(new URL("p0234", LINK_REDIRECTOR_URL)),
});
