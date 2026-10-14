import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SkyXCinnamorollPopUpCafe2026,
	name: "sky-x-cinnamoroll-pop-up-cafe",
	family: EventFamilyId.SkyXCinnamorollPopUpCafe,
	start: skyDate(2026, 11, 17),
	// End date not yet revealed.
	end: skyDate(2026, 12, 4),
});
