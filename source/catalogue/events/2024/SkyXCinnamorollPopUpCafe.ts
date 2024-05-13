import { URL } from "node:url";
import { Event } from "../../../Structures/Event.js";
import { CDN_URL } from "../../../Utility/Constants.js";
import { EventName } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

export default new Event({
	name: EventName.SkyXCinnamorollPopUpCafe,
	start: skyDate(2_024, 4, 27),
	end: skyDate(2_024, 5, 17),
	url: String(new URL("daily_guides/events/sky_x_cinnamoroll_pop_up_cafe/2024.webp", CDN_URL)),
	eventCurrencyPerDay: 5,
});
