import { URL } from "node:url";
import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { type ItemRaw, EventName } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { FACE_ACCESSORY_EMOJIS, HELD_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	name: EventName.AviarysFireworkFestival,
	start: skyDate(2_023, 11, 27),
	end: skyDate(2_023, 12, 17),
	eventCurrencyEnd: skyDate(2_023, 12, 11),
	url: String(new URL("daily_guides/events/aviarys_firework_festival/2023.webp", CDN_URL)),
	eventCurrencyPerDay: 5,
	offer: {
		hasInfographic: false,
		items: new Collection<number, ItemRaw>()
			.set(1 << 0, {
				name: "Face accessory",
				cost: { eventCurrency: 15 },
				emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory33,
			})
			.set(1 << 1, { name: "Prop", cost: { eventCurrency: 36 }, emoji: HELD_PROPS_EMOJIS.HeldProp39 }),
	},
});
