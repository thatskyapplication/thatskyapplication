import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SkyAnniversary2023,
	name: "sky-anniversary",
	family: EventFamily.SkyAnniversary,
	start: skyDate(2_023, 7, 17),
	end: skyDate(2_023, 7, 31),
	offer: [
		{
			translation: CosmeticCommon.HairAccessory,
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory4,
			cost: { eventTickets: 8 },
		},
		{
			cosmetic: Cosmetic.AnniversarySonorousSeashell,
			cost: { eventTickets: 46 },
		},
		{
			cosmetic: Cosmetic.AnniversaryPartyLights,
			cost: { eventTickets: 46 },
		},
		{
			cosmetic: Cosmetic.AnniversaryPlush,
			cost: { money: 9.99 },
		},
	],
});
