import { Event } from "../../../models/Event.js";
import { CDN_URL } from "../../../utility/Constants.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2024, 4, 27), end = skyDate(2024, 5, 18);
	start < end;
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
	id: EventId.SkyXCinnamorollPopUpCafe2024,
	start: skyDate(2_024, 4, 27),
	end: skyDate(2_024, 5, 18),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Cosy Teacup Headband",
			cosmetic: Cosmetic.CosyTeacupHeadband,
			cost: { eventCurrency: 22 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory41,
		},
		{
			name: "Cosy Cafe Table",
			cosmetic: Cosmetic.CosyCafeTable,
			cost: { eventCurrency: 52 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp50,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Combo",
			cosmetic: [
				Cosmetic.CinnamorollPopUpCafeSwirledHair,
				Cosmetic.CinnamorollPopUpCafeCinnamarollEars,
			],
			cost: { money: 14.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory40,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Plushie",
			cosmetic: Cosmetic.CinnamorollPopUpCafePlushie,
			cost: { money: 14.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp44,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Mini Companion",
			cosmetic: Cosmetic.CinnamorollPopUpCafeMiniCompanion,
			cost: { money: 6.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory39,
		},
		{
			name: "Cinnamoroll Pop-Up Cafe Bowtie and Cloud Cape",
			cosmetic: [Cosmetic.CinnamorollPopUpCafeBowtie, Cosmetic.CinnamorollPopUpCafeCloudCape],
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape130,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1308",
});
