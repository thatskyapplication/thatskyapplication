import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { SHOE_EMOJIS } from "../../../utility/emojis.js";
import { SpiritEmote, SpiritEmoteToEmoji } from "../../../utility/spirits.js";

const emote = SpiritEmote.CureForMeDance;
const emoteEmoji = SpiritEmoteToEmoji[emote];

export default new Event({
	id: EventId.AURORAEncoreConcerts2023,
	start: skyDate(2_023, 8, 23),
	end: skyDate(2_023, 9, 4),
	offer: [
		{
			name: `${emote} 1`,
			cosmetic: Cosmetic.EmoteCureForMe1,
			cost: { eventCurrency: 12 },
			emoji: emoteEmoji,
		},
		{
			name: `${emote} 2`,
			cosmetic: Cosmetic.EmoteCureForMe2,
			cost: { eventCurrency: 33 },
			emoji: emoteEmoji,
		},
		{
			name: "Musical Voyage Sneakers",
			cosmetic: Cosmetic.MusicalVoyageSneakers,
			cost: { money: 6.99 },
			emoji: SHOE_EMOJIS.Shoe05,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1135",
});
