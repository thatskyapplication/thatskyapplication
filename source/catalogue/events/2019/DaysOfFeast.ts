import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type FriendshipTreeItem, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFeast2019,
	start: skyDate(2_019, 12, 22),
	end: skyDate(2_020, 1, 2),
	url: null,
	offer: {
		hasInfographic: false,
		items: new Collection<number, FriendshipTreeItem>().set(1 << 0, {
			name: "Days of Feast Pack",
			cost: { money: 6.99 },
			emoji: HAIR_EMOJIS.Hair48,
		}),
	},
});
