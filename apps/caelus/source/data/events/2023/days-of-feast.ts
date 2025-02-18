import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CDN_URL } from "../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	SHOE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2_023, 12, 18), end = skyDate(2_024, 1, 8);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(new URL("events/2023/days_of_feast/event_tickets.webp", CDN_URL)),
	});
}

export default new Event({
	id: EventId.DaysOfFeast2023,
	start: skyDate(2_023, 12, 18),
	end: skyDate(2_024, 1, 8),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Winter Feast Snowboard",
			cosmetic: Cosmetic.WinterFeastSnowboard,
			cost: { eventTickets: 44 },
			emoji: HELD_PROPS_EMOJIS.HeldProp40,
		},
		{
			name: "Winter Pine Cone Hair Clip",
			cosmetic: Cosmetic.WinterPineConeHairClip,
			cost: { eventTickets: 19 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory34,
		},
		{
			name: "Course Creation Prop",
			cosmetic: Cosmetic.CourseCreationProp,
			cost: { candles: 150 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp33,
		},
		{
			name: "Cosy Hermit Boots",
			cosmetic: Cosmetic.CosyHermitBoots,
			cost: { money: 6.99 },
			emoji: SHOE_EMOJIS.Shoe13,
		},
		{
			name: "Winter Quilted Cape",
			cosmetic: Cosmetic.WinterQuiltedCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape120,
		},
	],
	patchNotesURL: String(new URL("p0235", LINK_REDIRECTOR_URL)),
});
