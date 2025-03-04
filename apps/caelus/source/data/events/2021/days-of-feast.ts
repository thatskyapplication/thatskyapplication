import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.DaysOfFeast2021,
	start: skyDate(2_021, 12, 20),
	end: skyDate(2_022, 1, 10),
	offer: [
		{
			name: "Ode to Joy music sheet",
			cosmetic: Cosmetic.OdeToJoyMusicSheet,
			cost: { candles: 10 },
		},
		{
			name: "Winter Feast Pillow",
			cosmetic: Cosmetic.WinterFeastPillow,
			cost: { candles: 10 },
		},
		{
			name: "Winter Feast Scarf",
			cosmetic: Cosmetic.WinterFeastScarf,
			cost: { candles: 50 },
		},
		{
			name: "Winter Feast Hat",
			cosmetic: Cosmetic.WinterFeastHat,
			cost: { hearts: 20 },
		},
		{
			name: "Snowflake Hair Accessory",
			cosmetic: Cosmetic.SnowflakeHairAccessory,
			cost: { money: 1.99 },
		},
		{
			name: "Winter Ancestor Cape",
			cosmetic: Cosmetic.WinterAncestorCape,
			cost: { money: 9.99 },
		},
		{
			name: "Winter Feast Snowglobe",
			cosmetic: Cosmetic.WinterFeastSnowGlobe,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: String(new URL("p0155", LINK_REDIRECTOR_URL)),
});
