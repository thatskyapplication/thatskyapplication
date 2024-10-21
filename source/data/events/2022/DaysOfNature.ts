import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";
import { CAPE_EMOJIS, HAIR_ACCESSORY_EMOJIS, NECKLACE_EMOJIS } from "../../../Utility2/emojis.js";

export default new Event({
	id: EventId.DaysOfNature2022,
	start: skyDate(2_022, 4, 18),
	end: skyDate(2_022, 5, 2),
	offer: [
		{
			name: "Nature Coral Crown",
			cosmetic: Cosmetic.NatureCoralCrown,
			cost: { hearts: 20 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory19,
		},
		{
			name: "Nature Turtle Cape",
			cosmetic: Cosmetic.NatureTurtleCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape81,
		},
		{
			name: "Nature Turtle Pack",
			cosmetic: Cosmetic.NatureShoulderTurtle,
			cost: { money: 19.99 },
			emoji: NECKLACE_EMOJIS.Necklace20,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/890",
});
