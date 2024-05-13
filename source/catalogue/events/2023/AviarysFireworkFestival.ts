import { URL } from "node:url";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { EventName } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	name: EventName.AviarysFireworkFestival,
	start: skyDate(2_023, 11, 27),
	end: skyDate(2_023, 12, 17),
	eventCurrencyEnd: skyDate(2_023, 12, 11),
	url: String(new URL("daily_guides/events/aviarys_firework_festival/2023.webp", CDN_URL)),
	eventCurrencyPerDay: 5,
});
