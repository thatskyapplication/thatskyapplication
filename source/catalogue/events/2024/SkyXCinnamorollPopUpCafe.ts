import { URL } from "node:url";
import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { type ItemRaw, EventName } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	name: EventName.SkyXCinnamorollPopUpCafe,
	start: skyDate(2_024, 4, 27),
	end: skyDate(2_024, 5, 17),
	url: String(new URL("daily_guides/events/sky_x_cinnamoroll_pop_up_cafe/2024.webp", CDN_URL)),
	eventCurrencyPerDay: 5,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, {
				name: "Hair accessory",
				cost: { eventCurrency: 22 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory41,
			})
			.set(1 << 1, {
				name: "Prop",
				cost: { eventCurrency: 52 },
				emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp50,
			})
			.set(1 << 2, {
				name: "Cinnamoroll Pop-Up Cafe Combo",
				cost: { money: 14.99 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory40,
			})
			.set(1 << 3, {
				name: "Cinnamoroll Pop-Up Cafe Plushie",
				cost: { money: 14.99 },
				emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp44,
			})
			.set(1 << 4, {
				name: "Cinnamoroll Pop-Up Cafe Mini Companion",
				cost: { money: 6.99 },
				emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory39,
			})
			.set(1 << 5, {
				name: "Cinnamoroll Pop-Up Cafe Bowtie and Cloud Cape",
				cost: { money: 14.99 },
				emoji: CAPE_EMOJIS.Cape130,
			}),
	},
});
