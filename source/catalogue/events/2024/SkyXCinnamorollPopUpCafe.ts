import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2024, 4, 27), end = skyDate(2024, 5, 17);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(
			new URL("events/2024/sky_x_cinnamoroll_pop_up_cafe/event_currency.webp", CDN_URL),
		),
	});
}

export default new Event({
	nameUnique: EventNameUnique.SkyXCinnamorollPopUpCafe2024,
	start: skyDate(2_024, 4, 27),
	end: skyDate(2_024, 5, 17),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Hair accessory",
			bit: 1 << 0,
			cost: { eventCurrency: 22 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory41,
		},
		{
			name: "Prop",
			bit: 1 << 1,
			cost: { eventCurrency: 52 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp50,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Combo",
			bit: 1 << 2,
			cost: { money: 14.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory40,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Plushie",
			bit: 1 << 3,
			cost: { money: 14.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp44,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Mini Companion",
			bit: 1 << 4,
			cost: { money: 6.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory39,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Bowtie and Cloud Cape",
			bit: 1 << 5,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape130,
		},
	],
});
