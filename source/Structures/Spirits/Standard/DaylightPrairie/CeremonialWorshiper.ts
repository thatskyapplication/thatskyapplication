/* eslint-disable unicorn/prefer-math-trunc */
import { Collection } from "discord.js";
import { Realm } from "../../../../Utility/Constants.js";
import { type ItemsData, Emote, SpiritName, StandardSpirit } from "../../Base.js";

const emote = Emote.Teamwork;

export default new StandardSpirit({
	name: SpiritName.CeremonialWorshiper,
	emote,
	realm: Realm.DaylightPrairie,
	offer: {
		current: new Collection<number, ItemsData>()
			.set(1 << 0, { item: Emote.Teamwork, cost: null })
			.set(1 << 1, { item: "Blessing 1", cost: { candles: 1 } })
			.set(1 << 2, { item: "Heart", cost: { candles: 3 } })
			.set(1 << 3, { item: "Wing buff", cost: { ascendedCandles: 1 } })
			.set(1 << 4, { item: "Blessing 2", cost: { candles: 5 } }),
	},
});
