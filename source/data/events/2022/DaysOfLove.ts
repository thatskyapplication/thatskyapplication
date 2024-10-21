import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfLove2022,
	start: skyDate(2_022, 2, 7),
	end: skyDate(2_022, 2, 23),
	offer: [
		{
			name: "Days of Love Flower Crown",
			cosmetic: Cosmetic.DaysOfLoveFlowerCrown,
			cost: { hearts: 15 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory17,
		},
		{
			name: "Days of Love Gondola Pack",
			cosmetic: Cosmetic.DaysOfLoveGondola,
			cost: { money: 19.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp14,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/866",
});
