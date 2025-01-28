import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2024, 12, 23), end = skyDate(2025, 1, 13);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.SkyXAlicesWonderlandCafe2024,
	start: skyDate(2_024, 12, 23),
	end: skyDate(2_025, 1, 13),
	eventCurrency: {
		amount: eventCurrencyAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_024, 12, 23),
				end: skyDate(2025, 1, 12),
			},
		],
	},
	offer: [
		{
			name: "Wonderland Stacked Hat",
			cosmetic: Cosmetic.WonderlandStackedHat,
			cost: { eventCurrency: 18 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory51,
		},
		{
			name: "Wonderland Frantic Hair",
			cosmetic: Cosmetic.WonderlandFranticHair,
			cost: { eventCurrency: 30 },
			emoji: HAIR_EMOJIS.Hair153,
		},
		{
			name: "Wonderland Teacup Bath",
			cosmetic: Cosmetic.WonderlandTeacupBath,
			cost: { eventCurrency: 36 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp78,
		},
		{
			name: "Wonderland Hare Hairstyle",
			cosmetic: Cosmetic.WonderlandHareHairstyle,
			cost: { candles: 150 },
			emoji: HAIR_EMOJIS.Hair154,
		},
		{
			name: "Wonderland Primrose Pinafore Set",
			cosmetic: [
				Cosmetic.WonderlandPrimrosePinaforeDress,
				Cosmetic.WonderlandPrimrosePinaforeHairAccessory,
			],
			cost: { money: 11.99 },
			emoji: OUTFIT_EMOJIS.Outfit74,
		},
		{
			name: "Wonderland Cafe Corridor",
			cosmetic: Cosmetic.WonderlandCafeCorridor,
			cost: { money: 11.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp86,
		},
	],
	patchNotesURL: String(new URL("p0275", LINK_REDIRECTOR_URL)),
});
