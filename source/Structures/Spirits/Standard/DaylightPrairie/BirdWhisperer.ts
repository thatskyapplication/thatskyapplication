/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { CALLS_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../../Utility/emojis.js";
import { type ItemsData, Call, SpiritName, StandardSpirit } from "../../Base.js";

const call = Call.Bird;
const callEmoji = CALLS_EMOJIS.Bird;

export default new StandardSpirit({
	name: SpiritName.BirdWhisperer,
	call,
	realm: Realm.DaylightPrairie,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: `${call} call`, cost: null, emoji: callEmoji })
			.set(1 << 1, { item: "Music sheet", cost: { hearts: 1 } })
			.set(1 << 2, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 3, { item: "Heart", cost: { candles: 3 }, emoji: MISCELLANEOUS_EMOJIS.Heart })
			.set(1 << 4, { item: "Wing buff", cost: { ascendedCandles: 2 } })
			.set(1 << 5, { item: "Blessing 2", cost: { candles: 5 } })
			.set(1 << 6, { item: "Hair", cost: { hearts: 5 } }),
	},
});
